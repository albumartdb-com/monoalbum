#!/bin/bash

coverage run -m pytest --verbose --color=yes --assert=plain ./tests/test_.py
coverage report -m
