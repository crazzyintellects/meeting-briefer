
import re


def process_punctuation(x):
    "this model does not like punctuation touching characters."
    return re.sub('([.,!?()])', r' \1 ', x)  # https://stackoverflow.com/a/3645946/
