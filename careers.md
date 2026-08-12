---
permalink: /careers/
layout: v2/default
title: "Careers at Leapath — You Don't Need to Be Perfect. You Need to Care."
description: "Join Leapath's founder's office. Real ownership from day one, a 5-day response guarantee, and no ghosting — ever. View open roles and apply."
canonical: "https://www.leapath.tech/careers/"
extra_css: /css/v2/careers.css
extra_js: /js/v2/careers.js
---

{% assign open_count = site.v2_open_roles.size %}
{% include v2/sections/page-hero.html tone="photo" style="background-image:url('/assets/v2/images/blogs/90-day-readiness-sprint/tpo-playbook.jpg')" eyebrow="Now accepting applications" title="You don't need to be perfect. <em>You need to care.</em>" sub="We're not looking for the most polished resume in the room. We're looking for someone who is curious, hungry, and ready to do real work that matters. If that's you — you already belong here." btn1_text="See Open Roles" btn1_href="#open-roles" btn2_text="Drop Your Resume" btn2_href="#open-application" stat1_n="100%" stat1_l="Remote-friendly" stat2_n="Under 7 days" stat2_l="Application response" stat3_n=open_count stat3_l="Open roles" %}
{% include v2/sections/careers-values.html %}
{% include v2/sections/careers-process.html %}
{% include v2/sections/careers-roles.html %}
{% include v2/sections/careers-drawer.html %}
{% include v2/sections/reviews.html %}
{% include v2/sections/careers-open-apply.html %}

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
