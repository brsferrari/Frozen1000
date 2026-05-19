"""Views for the landing app."""

import json

from django.views.generic import TemplateView

from . import data


class IndexView(TemplateView):
    """Render the single landing page."""

    template_name = "landing/index.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        slots, slots_json = data.slots_for_template()
        ctx.update(
            {
                "slots": slots,
                "slots_json": json.dumps(slots_json, ensure_ascii=False),
                "products": data.PRODUCTS,
                "cats": data.CATS,
                "ticker": data.TICKER + data.TICKER,  # doubled for seamless marquee
                "steps": data.STEPS,
                "stores": data.STORES,
                "ig_list": [slots[sid] for sid in data.IG_LIST],
                "nav_links": data.NAV_LINKS,
            }
        )
        return ctx
