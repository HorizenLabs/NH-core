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
        workspace_file = f"{dir}/Cargo.toml"
        with open(workspace_file) as workspace_file:
            workspace_toml = toml.load(workspace_file)
            for library_path in workspace_toml["workspace"]["members"]:
                library_file = f"{dir}/{library_path}/Cargo.toml"
                with open(library_file) as library_file:
                    library_toml = toml.load(library_file)
                    polkadot_libs[library_toml['package']['name']] = library_toml['package']['version']
                    print(f"Name: {library_toml['package']['name']} - Version: {library_toml['package']['version']}")

        print("\n----------\n")

        workspace_file = f"{os.getcwd()}/Cargo.toml"
        with open(workspace_file) as workspace_file:
            workspace_toml = toml.load(workspace_file)
            for library_name in workspace_toml["workspace"]["dependencies"]:
                if (library_name in polkadot_libs):
                    print(f"Library used: {library_name}")
                    library_info = workspace_toml["workspace"]["dependencies"][library_name]
                    if ("version" in library_info):
                        print("Version as dict")
                        version = str(library_info["version"])
                        workspace_toml["workspace"]["dependencies"][library_name]["version"]=polkadot_libs[library_name]
                    elif str(library_info).count("{") == 0:
                        print("Version as string")
                        version = str(library_info)
                        workspace_toml["workspace"]["dependencies"][library_name]=polkadot_libs[library_name]
                    else:
                        print("Unable to determine library version!")
                    if version != polkadot_libs[library_name]:
                        print(f"{library_name} should be upgraded (from {version} to {polkadot_libs[library_name]})")

        workspace_file = f"{os.getcwd()}/Cargo.toml"
        with open(workspace_file) as workspace_file:
            toml.dump(workspace_toml, workspace_file) #ERROR


        # Step 2: Checkout a specific branch (e.g., 'main' or 'develop')
        branch_name = "release-crates-io-v1.6.0"  # Replace with the desired branch name
        repo = Repo(tmp_dir)
        repo.git.checkout(branch_name)
        print(f"Updating at {repo.head.commit}")
    
        # Optional: Pull the latest changes from the remote branch
        repo.git.pull()