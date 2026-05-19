"""Custom template helpers for the landing app."""

from django import template

register = template.Library()


@register.filter
def get_slot(slots, key):
    """Look up a slot dict by id — used when the id is in a loop variable."""
    if not slots:
        return None
    return slots.get(key)
