import logging
import yaml
import ecs_logging
from logging.config import dictConfig

log = logging.getLogger()
dictConfig(yaml.safe_load(open('log_config.yaml', 'r')))
