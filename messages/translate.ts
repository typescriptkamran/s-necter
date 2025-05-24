type Translation = {
    nav: {
        home: string,
        products: string,
        about: string,
        contact: string
    },
    products: {
        title: string
    },

    product: {
        price: string
        details: {
            heading: string
        }
    },
    home: {
        meta: {
            title: string,
            description: string,
            keywords: string
        },
        hero: {
            title: string
            subtitle: string
            cta: string
        }
    },
    featured: {
        title: string
    },
    cart: {
        title: string,
        empty: string,
        total: string,
        checkout: string,
        quantity: string
    },
    checkout: {
        title: string,
        name: string,
        phone: string,
        address: string,
        paymentMethod: string,
        cod: string,
        summary: string,
        placeOrder: string,
        namePlaceholder: string,
        phonePlaceholder: string,
        addressPlaceholder: string
    },
    thankYou: {
        title: string,
        message: string,
        orderNumber: string,
        contactMessage: string,
        backToHome: string
    },
    language: {[key: string]: string}
}