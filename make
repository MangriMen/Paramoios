RUNTEST=python -m unittest2 -v -b

ALLMODULES=$(patsubst %.py, %.py, $(wildcard test*.py))

all:
        ${RUNTEST} ${ALLMODULES}

% : test%.py
        ${RUNTEST} test$@