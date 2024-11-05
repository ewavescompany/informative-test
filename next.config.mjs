// next.config.js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  images: {
    domains: ["v3.ewavespro.com"], // Add allowed domain here
  },
});
