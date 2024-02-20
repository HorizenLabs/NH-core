FROM rust:1-buster as builder

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    protobuf-compiler \
    clang && \
    rustup target add wasm32-unknown-unknown && \
    rustup component add rust-src && \
    # apt cleanup
    apt-get autoremove -y && \
    apt-get clean && \
    find /var/lib/apt/lists/ -type f -not -name lock -delete;

WORKDIR /usr/src/node
COPY . .
RUN cargo build --release

FROM ubuntu:22.04 as node

SHELL ["/bin/bash", "-c"]

# metadata
ARG VCS_REF
ARG BUILD_DATE
ARG IMAGE_NAME

ARG BIN_FOLDER=.
ARG DOC_URL=https://github.com/HorizenLabs/NH-core
ARG DESCRIPTION="NH-core"
ARG AUTHORS="devops@horizenlabs.io"
ARG VENDOR="Horizen Labs"

LABEL io.hl.image.authors=${AUTHORS} \
    io.hl.image.vendor="${VENDOR}" \
    io.hl.image.revision="${VCS_REF}" \
    io.hl.image.title="${IMAGE_NAME}" \
    io.hl.image.created="${BUILD_DATE}" \
    io.hl.image.documentation="${DOC_URL}" \
    io.hl.image.description="${DESCRIPTION}" \
    io.hl.image.source="https://github.com/HorizenLabs/NH-core/blob/${VCS_REF}/docker/dockerfiles/hl-node.Dockerfile"

USER root
WORKDIR /app

ENV BINARY=${BINARY}

COPY --from=builder "/usr/src/node/target/release/nh-node" "/usr/local/bin/"
RUN chmod -R a+rx "/usr/local/bin"

ENV RUN_USER hl

RUN useradd -m -u 1000 -U -s /bin/sh -d /${RUN_USER} ${RUN_USER} && \
    mkdir -p /data /${RUN_USER}/.local/share && \
    chown -R ${RUN_USER}:${RUN_USER} /data /${RUN_USER} && \
    ln -s /data /${RUN_USER}/.local/share/${RUN_USER}

USER ${RUN_USER}
ENV BINARY=${BINARY}

# ENTRYPOINT
ENTRYPOINT ["/usr/local/bin/nh-node"]

# We call the help by default
CMD ["--help"]

