"""
A script to update dependencies
"""

import argparse
from git import Repo
import tempfile
import toml # pip install toml
import os

def a_function(an_argument):
    return 0

if __name__ == "__main__":

    args = a_function(0)
    print(f"returned: {args}")

    with tempfile.TemporaryDirectory() as tmp_dir:
        print('Created temporary directory:', tmp_dir)
        # The directory and its contents will be automatically removed
        # Step 1: Clone the git repository into a temporary directory
        git_url = "git@github.com:paritytech/polkadot-sdk.git"

        #SOME EXPERIMENTS
        #pino = Repo.clone_from("https://github.com/HorizenLabs/zkVerify.git", tmp_dir) #KO
        #pino = Repo.clone_from("git@github.com:HorizenLabs/zkVerify.git", tmp_dir) #OK
        #pino = Repo.clone_from("git@github.com:HorizenLabs/zkVerify.git", tmp_dir, branch_name="release/0.4.0") #KO
        #pino = Repo.clone_from("git@github.com:HorizenLabs/zkVerify.git", tmp_dir, branch="release/0.4.0") #OK
        #pino = Repo.clone_from("git@github.com:HorizenLabs/zkVerify.git", tmp_dir, branch="release/0.4.0", depth=1) #OK
        #pino = Repo.clone_from("git@github.com:HorizenLabs/zkVerify.git", tmp_dir, branch="release/0.4.0", depth=1, peppiniello=2) #KO
        #SOME EXPERIMENTS

        #repo = Repo.clone_from(git_url, tmp_dir, branch="release-crates-io-v1.6.0", depth=1)
        #repo = Repo("/tmp/tmp5moo4_qw")


        polkadot_libs = {}
        dir = "/tmp/repo"
        workspace_file_path = f"{dir}/Cargo.toml"
        with open(workspace_file_path) as workspace_file:
            workspace_toml = toml.load(workspace_file)
            for library_path in workspace_toml["workspace"]["members"]:
                library_file = f"{dir}/{library_path}/Cargo.toml"
                with open(library_file) as library_file:
                    library_toml = toml.load(library_file)
                    polkadot_libs[library_toml['package']['name']] = library_toml['package']['version']
                    print(f"Name: {library_toml['package']['name']} - Version: {library_toml['package']['version']}")

        print("\n----------\n")

        workspace_file_path = f"{os.getcwd()}/Cargo.toml"
        zkverify_deps = {}
        with open(workspace_file_path) as workspace_file:
            workspace_toml = toml.load(workspace_file)
            for library_name in workspace_toml["workspace"]["dependencies"]:
                if (library_name in polkadot_libs):
                    print(f"Library used: {library_name}")
                    library_info = workspace_toml["workspace"]["dependencies"][library_name]
                    if ("version" in library_info):
                        version = str(library_info["version"])
                        version_updated = workspace_toml["workspace"]["dependencies"][library_name]
                        version_updated["version"] = polkadot_libs[library_name]
                        version_updated = "{ " + toml.dumps(version_updated).replace("\n", ", ")[0:-2] + " }"
                    elif str(library_info).count("{") == 0:
                        version = str(library_info)
                        version_updated = f"\"{polkadot_libs[library_name]}\""
                    else:
                        print(f"WARNING: unable to determine library version for {library_name}!")
                    if version != polkadot_libs[library_name]:
                        print(f"{library_name} is going to be upgraded (from {version} to {polkadot_libs[library_name]})")
                        zkverify_deps[library_name] = version_updated

        workspace_file_path = f"{os.getcwd()}/Cargo.toml"
        with open(workspace_file_path, 'r') as workspace_file:
            read_lines = workspace_file.readlines()
        lines_to_write = []
        multi_line_lib = False
        for read_line in read_lines:
            library_name = read_line.split("=")[0].strip()
            if (library_name in zkverify_deps):
                lines_to_write.append(f"{library_name} = {zkverify_deps[library_name]}\n")
                if read_line.count("{") == 1 and read_line.count("}") == 0:
                    multi_line_lib = True
            else:
                if  (not multi_line_lib):
                    lines_to_write.append(read_line)
                if read_line.count("{") == 0 and read_line.count("}") == 1:
                    multi_line_lib = False
        with open(workspace_file_path, 'w') as workspace_file:
            lines = workspace_file.writelines(lines_to_write)