module.exports = {
  locales: ['vn', 'en'],
  defaultLocale: 'vn',
  pages: {
    '*': ['common'],
    '/sign-in': ['sign-in'],
    '/profile': ['profile'],
    '/agencys/create-agency': ['agencys'],
    '/agencys': ['agencys'],
    '/agencys/[id]': ['agencys', 'agencys-detail'],
    '/': ['home'],
    '/recharges': ['recharges'],
    '/orders': ['orders'],
    '/orders-error': ['orders-error'],
    '/logs': ['logs'],
    '/settings/commissions': ['commissions'],
    '/settings/debt-limit': ['debt-limit'],
    '/orders/[id]': ['order-detail'],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
};
