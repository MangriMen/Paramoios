RUNTEST=-m unittest2 -v -b

ALLMODULES=$(patsubst %.py, %.py, $(wildcard test*.py))

all:
	python ${RUNTEST} ${ALLMODULES} || python3 ${RUNTEST} ${ALLMODULES}

% : test%.py
	python ${RUNTEST} test$@ || python3 ${RUNTEST} test$@