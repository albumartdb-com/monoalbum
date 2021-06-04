#!/bin/bash
# The script that runs the programs for container functionality

service filebeat start
python3 /project/app.py
