VERSION ?= dev
project_name := ornithopter
image_name = $(project_name):$(VERSION)

DOCKER := docker
DOCKER_JOB := $(DOCKER) run --rm -it

default: build

build:
	$(DOCKER) build -t $(image_name) .
.PHONY: build

test:
	$(call job, npm run test)
.PHONY: test


shell:
	$(call job, bash)
.PHONY: shell


define job
  $(DOCKER_JOB) --volume $(PWD)/src:/home/ornithopter/src \
                --volume $(PWD)/tests:/home/ornithopter/tests \
                --workdir /home/ornithopter \
                $(image_name) \
                $1
endef
