

import os
import pathlib

# Flask settings
DEBUG = False

# Flask-restplus settings
RESTPLUS_MASK_SWAGGER = False
SWAGGER_UI_DOC_EXPANSION = 'none'

# API metadata


# default model
MODEL_NAME = 'get_to_the_point'
ASSET_DIR = pathlib.Path('./assets').absolute()
DEFAULT_MODEL_PATH = os.path.join(ASSET_DIR, MODEL_NAME)
DEFAULT_VOCAB_PATH = os.path.join(ASSET_DIR, 'vocab')
