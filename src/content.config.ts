import { defineCollection, z } from 'astro:content';

const profileContentSchema = z.object({
  'supported-living': z.object({
    heading: z.string(),
    subheading: z.string(),
  }),
  'dom-care': z.object({
    heading: z.string(),
    subheading: z.string(),
  }),
});

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  schema: z.record(z.string(), z.any()),
});

const contactSectionSchema = z.object({
  heading: z.string(),
  intro: z.string(),
  phoneLabel: z.string(),
  phoneHref: z.string(),
  emailLabel: z.string(),
  emailHref: z.string(),
  address: z.string(),
});

const serviceFitSchema = z.object({
  badgeLabel: z.string(),
  heading: z.string(),
  intro: z.string(),
  suitableForTitle: z.string(),
  suitableFor: z.array(z.string()),
  alternativeSupportTitle: z.string(),
  alternativeSupport: z.array(z.string()),
});

const outcomesSnapshotSchema = z.object({
  heading: z.string(),
  intro: z.string(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      detail: z.string(),
    })
  ),
});

const firstThirtyDaysSchema = z.object({
  heading: z.string(),
  intro: z.string(),
  milestones: z.array(
    z.object({
      dayRange: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
});

const faqSectionSchema = z.object({
  heading: z.string(),
  intro: z.string(),
  items: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

const classicGlobal = defineCollection({
  type: 'data',
  schema: z.object({
    profileSummary: z.object({
      'supported-living': z.string(),
      'dom-care': z.string(),
    }),
  }),
});

const classicHome = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      profileContent: profileContentSchema,
      primaryCtaText: z.string(),
      primaryCtaHref: z.string(),
      secondaryCtaText: z.string(),
      secondaryCtaHref: z.string(),
      imageKey: z.string(),
      imageAlt: z.string(),
    }),
    welcome: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      description: z.string(),
    }),
    serviceHighlight: z.object({
      title: z.string(),
      description: z.string(),
      features: z.array(z.string()),
      imageKey: z.string(),
      imageAlt: z.string(),
    }),
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
    }),
    featuredSection: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      description: z.string(),
      benefits: z.array(z.string()),
      imageKey: z.string(),
      imageAlt: z.string(),
    }),
    cta: z.object({
      heading: z.string(),
      description: z.string(),
    }),
  }),
});

const classicAbout = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      subheading: z.string(),
      description: z.string(),
    }),
    story: z.object({
      heading: z.string(),
      paragraphs: z.array(z.string()),
      quote: z.string(),
      imageKey: z.string(),
      imageAlt: z.string(),
    }),
    values: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    valuesSection: z.object({
      heading: z.string(),
      intro: z.string(),
    }),
    ctaSection: z.object({
      heading: z.string(),
      intro: z.string(),
      buttonText: z.string(),
      buttonHref: z.string(),
    }),
  }),
});

const classicServices = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      eyebrow: z.string().optional(),
      heading: z.string(),
      subheading: z.string(),
      profileContent: profileContentSchema.optional(),
    }),
    services: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        features: z.array(z.string()),
        href: z.string().optional(),
        imageKey: z.string(),
        imageAlt: z.string(),
      })
    ),
  }),
});

const classicResidentialCare = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      heading: z.string(),
      subheading: z.string(),
      profileContent: profileContentSchema,
    }),
    outcomesSnapshot: outcomesSnapshotSchema,
    serviceFit: serviceFitSchema,
    firstThirtyDays: firstThirtyDaysSchema,
    overview: z.object({
      heading: z.string(),
      description: z.string(),
      features: z.array(z.string()),
    }),
    approach: z.object({
      heading: z.string(),
      description: z.string(),
      points: z.array(z.string()),
    }),
    whyChooseUs: z.object({
      heading: z.string(),
      intro: z.string(),
      points: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
      imageKey: z.string(),
      imageAlt: z.string(),
    }),
    faqSection: faqSectionSchema,
    relatedServices: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      ctaText: z.string(),
      ctaHref: z.string(),
      services: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          href: z.string(),
          imageKey: z.string(),
          imageAlt: z.string(),
        })
      ),
    }),
    contactSection: contactSectionSchema,
  }),
});

const classicContact = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      eyebrow: z.string().optional(),
      heading: z.string(),
      subheading: z.string(),
      profileContent: profileContentSchema.optional(),
    }),
    contactInfo: z.object({
      phoneLabel: z.string(),
      phoneHref: z.string(),
      phoneAvailability: z.string(),
      emailLabel: z.string(),
      emailHref: z.string(),
      address: z.string(),
    }),
  }),
});

const classicCareers = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      eyebrow: z.string().optional(),
      heading: z.string(),
      subheading: z.string(),
      profileContent: profileContentSchema.optional(),
    }),
    benefitsHeading: z.string(),
    benefits: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    vacanciesHeading: z.string(),
    vacancies: z.array(
      z.object({
        title: z.string(),
        employmentType: z.string(),
        location: z.string(),
        applyEmail: z.string(),
      })
    ),
    fallbackCopy: z.string(),
  }),
});

const whyChooseUsSchema = z.object({
  heading: z.string(),
  intro: z.string(),
  points: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  imageKey: z.string(),
  imageAlt: z.string(),
});

const relatedServicesSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  intro: z.string(),
  ctaText: z.string(),
  ctaHref: z.string(),
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      href: z.string(),
      imageKey: z.string(),
      imageAlt: z.string(),
    })
  ),
});

const approachSchema = z.object({
  heading: z.string(),
  description: z.string(),
  points: z.array(z.string()),
});

const classicOurHome = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      heading: z.string(),
      subheading: z.string(),
      profileContent: profileContentSchema,
    }),
    overview: z.object({
      heading: z.string(),
      description: z.string(),
      features: z.array(z.string()),
      imageKey: z.string(),
      imageAlt: z.string(),
    }),
    spacesSection: z.object({
      heading: z.string(),
      intro: z.string(),
      spaces: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          imageKey: z.string(),
          imageAlt: z.string(),
        })
      ),
    }),
    locationSection: z.object({
      heading: z.string(),
      description: z.string(),
      points: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
      ctaText: z.string(),
      ctaHref: z.string(),
    }),
    outcomesSnapshot: outcomesSnapshotSchema,
    serviceFit: serviceFitSchema,
    firstThirtyDays: firstThirtyDaysSchema,
    approach: approachSchema,
    whyChooseUs: whyChooseUsSchema,
    faqSection: faqSectionSchema,
    relatedServices: relatedServicesSchema,
    contactSection: contactSectionSchema,
    ctaSection: z.object({
      heading: z.string(),
      description: z.string(),
      primaryText: z.string(),
      primaryHref: z.string(),
    }),
  }),
});

const classicTransitionalCare = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      heading: z.string(),
      subheading: z.string(),
      profileContent: profileContentSchema,
    }),
    overview: z.object({
      heading: z.string(),
      description: z.string(),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    outcomesSection: z.object({
      heading: z.string(),
      description: z.string(),
      outcomes: z.array(z.string()),
    }),
    outcomesSnapshot: outcomesSnapshotSchema,
    serviceFit: serviceFitSchema,
    firstThirtyDays: firstThirtyDaysSchema,
    approach: approachSchema,
    whyChooseUs: whyChooseUsSchema,
    faqSection: faqSectionSchema,
    relatedServices: relatedServicesSchema,
    contactSection: contactSectionSchema,
    ctaSection: z.object({
      heading: z.string(),
      description: z.string(),
      primaryText: z.string(),
      primaryHref: z.string(),
    }),
  }),
});

const classicWellbeingSupport = defineCollection({
  type: 'data',
  schema: z.object({
    metadata: metadataSchema,
    hero: z.object({
      heading: z.string(),
      subheading: z.string(),
      profileContent: profileContentSchema,
    }),
    overview: z.object({
      heading: z.string(),
      description: z.string(),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    outcomesSection: z.object({
      heading: z.string(),
      description: z.string(),
      outcomes: z.array(z.string()),
    }),
    outcomesSnapshot: outcomesSnapshotSchema,
    serviceFit: serviceFitSchema,
    firstThirtyDays: firstThirtyDaysSchema,
    approach: approachSchema,
    whyChooseUs: whyChooseUsSchema,
    faqSection: faqSectionSchema,
    relatedServices: relatedServicesSchema,
    contactSection: contactSectionSchema,
    ctaSection: z.object({
      heading: z.string(),
      description: z.string(),
      primaryText: z.string(),
      primaryHref: z.string(),
    }),
  }),
});

export const collections = {
  classicGlobal,
  classicHome,
  classicAbout,
  classicServices,
  classicResidentialCare,
  classicContact,
  classicCareers,
  classicOurHome,
  classicTransitionalCare,
  classicWellbeingSupport,
};
