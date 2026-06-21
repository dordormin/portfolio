export const translations = {
  en: {
    personalInfo: {
      name: "Dordor Minetdi",
      role: "Full Stack Developer & AI Engineer",
      email: "dordor.minetdi@gmail.com",
      phone: "(819) 238-4105",
      location: "Oshawa, Greater Toronto Area, ON",
      linkedin: "https://www.linkedin.com/in/dordor-minetdi-0ab557193/",
      github: "https://github.com/dordormin",
      summary: "Dynamic Full Stack Developer & AI Engineer with 5 years of professional application development experience, built upon an 8-year foundation in the tech industry that began with early web creation. Evolving from those fundamentals and a formal Computer Science background, I bring deep expertise in mature full-stack frameworks, including .NET, Spring Boot, Laravel, and Django on the backend, seamlessly paired with modern frontends like React, Angular, and Vite. I am currently focused on AI engineering to bridge robust enterprise architectures with intelligent, data-driven systems.",
    },
    skills: [
      { category: "Backend & Database", items: ["C# & .NET", "Python (FastAPI, Django)", "Java & Spring Boot", "Node.js", "PostgreSQL & SQLite", "MongoDB"] },
      { category: "Frontend & UI", items: ["React & Vite", "Angular", "JavaScript / TypeScript", "HTML5 & CSS3"] },
      { category: "AI & Data Engineering", items: ["TensorFlow & PyTorch", "Scikit-Learn & Pandas", "Neural Networks", "LangChain & LangGraph", "RAG Architectures", "Data Pipelines", "SQLAlchemy"] },
      { category: "DevOps & Quality", items: ["Docker & CI/CD", "AWS Cloud", "Agile & Jira", "TDD & Testing"] },
    ],
    certifications: [
      { title: "Machine Learning Specialization", issuer: "Stanford / DeepLearning.AI", date: "April 2023" },
      { title: "Deep Learning Specialization", issuer: "DeepLearning.AI", date: "Ongoing" },
      { title: "Microsoft Certified: Azure Developer Associate", issuer: "Microsoft", date: "Ongoing" },
      { title: "AWS Cloud Practitioner", issuer: "AWS", date: "Ongoing" },
      { title: "Become a Software Architect", issuer: "LinkedIn Learning", date: "December 2022" },
      { title: "Web & App Development Certification", issuer: "Acerfi Cameroun", date: "2016" }
    ],
    experience: [
      {
        role: "Full Stack Developer",
        company: "COFRD",
        location: "Oshawa, ON, Canada",
        period: "March 2023 - Present",
        responsibilities: [
          "Architected and maintained robust full-stack web applications, ensuring high performance, scalability, and strict adherence to modern coding standards.",
          "Collaborated closely with cross-functional teams and stakeholders to gather requirements, design intuitive user interfaces, and seamlessly deploy end-to-end solutions.",
          "Optimized application performance by resolving complex technical issues, directly improving load times and overall software quality.",
          "Implemented automated CI/CD pipelines and established comprehensive test suites using Jest, significantly increasing test coverage and ensuring robust module integrity."
        ],
        achievements: [
          "Spearheaded the development of a flagship web platform, driving a 30% increase in user engagement and reducing page load times by 25%.",
          "Led cross-functional initiatives for innovative UI/UX enhancements, yielding a 40% improvement in user satisfaction and a 20% increase in conversion rates.",
        ],
      },
      {
        role: "Analyst Programmer",
        company: "Kolineo",
        location: "Sherbrooke, QC, Canada",
        period: "September 2021 - December 2021",
        responsibilities: [
          "Led full-lifecycle software development as an Analyst Programmer, overseeing requirements analysis, DevOps, and deployment pipelines.",
          "Engineered robust B2B REST APIs and complex ORMs (SQLAlchemy, Python, Django) to integrate Kolineo's warehousing and redistribution systems with external enterprise clients (e.g., Amazon, Costco).",
          "Managed cloud infrastructure by securely deploying backend services and Angular frontend applications on AWS, utilizing AWS for secret management and hosting."
        ],
        achievements: [
          "Successfully deployed scalable B2B integration services, enabling seamless warehousing data synchronization with major retailers (Amazon, Costco).",
          "Completed the end-to-end analytics and development mandate ahead of schedule, bridging complex backend integrations before transitioning to a Data Engineer internship."
        ],
      },
      {
        role: "Data Engineer",
        company: "Université de Sherbrooke",
        location: "Sherbrooke, QC, Canada",
        period: "January 2022 - May 2022",
        responsibilities: [
          "Designed and developed a custom SQL parser and linter evaluating complex queries for over 250 students, reducing manual grading time by 60%.",
          "Created automated data pipelines and verification tools (Python, SQL) that processed thousands of queries, ensuring 100% accuracy in performance benchmarking.",
          "Applied comprehensive data engineering techniques to build a reliable grading and query optimization system within a four-month timeframe."
        ],
        achievements: [
          "Streamlined the academic grading process by automating the verification and testing of complex SQL statements.",
          "Successfully delivered a fully functional educational tool that improved the accuracy and efficiency of evaluating student database assignments."
        ],
      },
      {
        role: "Web & IoT Developer, Coop",
        company: "Olympus NDT Canada",
        location: "Quebec, QC, Canada",
        period: "May 2021 - August 2021",
        responsibilities: [
          "Engineered dynamic web applications utilizing C#, ASP.NET MVC, and Angular 6 within an agile, multidisciplinary team.",
          "Actively participated in the full software development lifecycle, from gathering initial requirements to executing production deployments.",
          "Contributed to IoT integration features, ensuring seamless data flow between hardware components and user-facing dashboards."
        ],
        achievements: [
          "Consistently delivered high-quality, maintainable code, demonstrating strong proficiency across the entire .NET and Angular stack.",
          "Reduced overall bug incidents by 40% through proactive troubleshooting, rigorous testing, and effective problem resolution strategies."
        ],
      },
      {
        role: "Software Developer | QA Engineer, Coop",
        company: "SAP Labs Canada",
        location: "Montreal, QC, Canada",
        period: "January 2020 - April 2020",
        responsibilities: [
          "Developed high-quality software solutions utilizing rigorous Test-Driven Development (TDD) methodologies.",
          "Authored comprehensive unit tests using QUnit and OPA5, and conducted API integration testing with Postman, ensuring robust application stability.",
          "Actively participated in Agile Scrum ceremonies, utilizing Jira for sprint planning, task tracking, and continuous delivery."
        ],
        achievements: [
          "Demonstrated a strong commitment to software quality by identifying and resolving critical defects, significantly enhancing application performance.",
          "Maintained a 100% on-time task completion rate, effectively managing time and prioritizing deliverables within a fast-paced corporate environment."
        ],
      },
      {
        role: "Web Developer & Designer Intern",
        company: "Creolink Communications",
        location: "Yaoundé, Cameroon",
        period: "2017 - 2018",
        responsibilities: [
          "Initiated early career in tech by contributing to the complete web redesign for a prominent local internet service provider.",
          "Translated UI/UX wireframes from Adobe Photoshop into responsive layouts using HTML, CSS, Bootstrap, and JavaScript.",
          "Developed and maintained dynamic server-side functionalities utilizing PHP and WAMP architecture."
        ],
        achievements: [
          "Successfully modernized the company's digital presence, establishing a strong foundational mastery of fundamental web programming."
        ],
      }
    ],
    projects: [
      {
        id: "omnibrain",
        title: "Omnibrain",
        shortDescription: "An enterprise RAG web application for indexing and querying media documents with AI.",
        link: "https://omnibrain.dordorapps.tech/",
        tags: ["React", "Vite", "FastAPI", "Python", "LangChain", "LangGraph", "GitHub Actions", "Docker"],
        caseStudy: {
          challenge: "Enterprises needed a unified way to index complex media and internal documents into a vectorized database, allowing them to interrogate AI models for specific, context-aware answers.",
          solution: "Architected a Retrieval-Augmented Generation (RAG) system utilizing Python and FastAPI for the robust backend. Integrated LangChain and LangGraph to manage complex LLM workflows and AI tool creation. Built a fast, interactive frontend interface using Vite and React. Established fully automated CI/CD pipelines with GitHub Actions for automated testing and server deployments.",
          impact: "Vectorized over 10,000 internal documents into a scalable architecture, reducing information retrieval time by 80% and delivering context-aware AI answers with sub-second latency.",
        }
      },
      {
        id: "tradeoffstack",
        title: "TradeoffStack",
        shortDescription: "An IT and interior management tool built for a young interior management startup.",
        link: "https://tradeoffstack.dordorapps.tech/",
        tags: ["Vite", "React", ".NET 10", "Entity Framework", "PostgreSQL", "SQLite", "GitHub Actions", "Docker"],
        caseStudy: {
          challenge: "A young interior management company needed a reliable IT management tool. The system required robust primary data storage with built-in mechanisms for temporary backups, alongside a highly modern, responsive frontend.",
          solution: "Engineered a robust full-stack solution using .NET 10 and Entity Framework for the backend. Utilized PostgreSQL as the primary database while integrating SQLite for lightweight, temporary backups. Built the frontend with Vite and React, and established fully automated CI/CD pipelines with GitHub Actions for continuous testing and seamless server deployments.",
          impact: "Delivered an enterprise-grade management tool processing over 50,000 inventory SKUs with 99.9% uptime. Streamlined daily logistics and demonstrated robust DevOps practices handling hundreds of critical daily transactions.",
        }
      },
      {
        id: "cms-lite",
        title: "CMS Lite (WENZE)",
        shortDescription: "A drag-and-drop mini Content Management System designed for non-technical users.",
        link: "#",
        tags: ["Spring Boot", "Lombok", "JavaScript", "HTML", "DevOps"],
        caseStudy: {
          challenge: "Creating an accessible, drag-and-drop website builder for individuals with no technical background. The platform needed a flexible architecture to support multiple bespoke themes and dynamic page generation.",
          solution: "Built a robust backend utilizing the Spring Boot ecosystem and Lombok. Developed the frontend parsing engine with HTML and JavaScript to handle drag-and-drop page creation and render a custom theme format. Actively integrated DevOps practices to streamline the software development lifecycle.",
          impact: "Empowered non-technical users to independently design and deploy customized websites. The custom theme format established a scalable foundation for rapidly introducing new visual templates to the platform.",
        }
      }
    ],
    blogPosts: [
      {
        id: "future-of-llms",
        title: "The Future of LLMs in Enterprise Architecture",
        date: "October 15, 2025",
        excerpt: "Exploring how Retrieval-Augmented Generation (RAG) is transforming the way large corporations index and query their proprietary data.",
        content: "Large Language Models (LLMs) are no longer just chatbots; they are becoming integral components of enterprise architecture. By utilizing Retrieval-Augmented Generation (RAG), companies can securely connect their internal databases to AI models. This prevents hallucination and ensures that answers are grounded in proprietary facts. My work on Omnibrain demonstrated that by vectorizing over 10,000 documents, we can achieve sub-second latency for complex queries, ultimately reducing information retrieval time by 80%.",
        tags: ["AI", "RAG", "Enterprise"]
      },
      {
        id: "aws-serverless-2026",
        title: "Scaling with AWS Serverless in 2026",
        date: "January 22, 2026",
        excerpt: "A deep dive into why moving from traditional monolithic servers to AWS Lambda and Fargate can cut costs and improve uptime.",
        content: "Managing servers can be a heavy burden for growing startups. By transitioning to AWS Serverless architectures, teams can focus on writing code rather than managing infrastructure. Services like AWS Lambda allow you to run code without provisioning or managing servers, and you pay only for the compute time you consume. In recent deployments, adopting serverless has shown to reduce infrastructure overhead by nearly 40% while maintaining 99.9% uptime across critical B2B endpoints.",
        tags: ["AWS", "Cloud", "DevOps"]
      },
      {
        id: "react-three-fiber-ux",
        title: "Immersive Web: React Three Fiber",
        date: "April 05, 2026",
        excerpt: "How adding 3D WebGL components to traditional web applications can dramatically increase user engagement and retention.",
        content: "The web is transitioning from flat, 2D interfaces to immersive, spatial experiences. React Three Fiber (R3F) provides a powerful bridge between React's declarative state management and Three.js's rendering engine. By carefully implementing WebGL canvases—such as interactive particle systems and 3D galleries—developers can create 'Awwwards-level' websites. The key is balancing aesthetic complexity with mobile performance, ensuring that post-processing effects gracefully degrade on low-end devices.",
        tags: ["WebGL", "React", "UX"]
      }
    ],
    ui: {
      viewWork: "View Work",
      contactMe: "Contact Me",
      downloadCv: "Download CV",
      technicalArsenal: "Technical Arsenal",
      professionalPath: "Professional Path",
      featuredWork: "Featured Work",
      letsConnect: "Let's Connect.",
      contactLead: "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
      availableForCollab: "Available for collaboration",
      theChallenge: "The Challenge",
      theSolution: "The Solution",
      theImpact: "The Impact",
      viewLiveSite: "View Live Site",
      project: "PROJECT",
      certifications: "Certifications",
      osWidget: {
        localEnv: "Local Env",
        sysOk: "SYS_OK",
        weather: {
          clear: "Clear",
          sunny: "Sunny",
          cloudy: "Cloudy",
          foggy: "Foggy",
          rainy: "Rainy",
          snowy: "Snowy",
          stormy: "Stormy",
          unavailable: "Unavailable"
        }
      }
    }
  },
  fr: {
    personalInfo: {
      name: "Dordor Minetdi",
      role: "Développeur Full Stack & Ingénieur IA",
      email: "dordor.minetdi@gmail.com",
      phone: "(819) 238-4105",
      location: "Oshawa, Région de Toronto, ON",
      linkedin: "https://www.linkedin.com/in/dordor-minetdi-0ab557193/",
      github: "https://github.com/dordormin",
      summary: "Développeur Full Stack & Ingénieur IA dynamique avec 5 ans d'expérience professionnelle en développement d'applications, bâtis sur 8 ans de parcours dans la tech depuis mes premiers pas en création web. Ayant évolué à partir de ces fondamentaux et d'un baccalauréat en informatique, j'apporte une solide expertise dans les frameworks full-stack d'entreprise, incluant .NET, Spring Boot, Laravel et Django en backend, couplés à React, Angular et Vite en frontend. Je me concentre actuellement sur l'ingénierie IA pour concevoir des systèmes intelligents et bâtir les logiciels de demain.",
    },
    skills: [
      { category: "Backend & Bases de données", items: ["C# & .NET", "Python (FastAPI, Django)", "Java & Spring Boot", "Node.js", "PostgreSQL & SQLite", "MongoDB"] },
      { category: "Frontend & UI", items: ["React & Vite", "Angular", "JavaScript / TypeScript", "HTML5 & CSS3"] },
      { category: "IA & Ingénierie de Données", items: ["TensorFlow & PyTorch", "Scikit-Learn & Pandas", "Réseaux de Neurones", "LangChain & LangGraph", "Architectures RAG", "Pipelines de Données", "SQLAlchemy"] },
      { category: "DevOps & Qualité", items: ["Docker & CI/CD", "AWS Cloud", "Agile & Jira", "TDD & Tests"] },
    ],
    certifications: [
      { title: "Spécialisation Machine Learning", issuer: "Stanford / DeepLearning.AI", date: "Avril 2023" },
      { title: "Spécialisation Deep Learning", issuer: "DeepLearning.AI", date: "En cours" },
      { title: "Microsoft Certified: Azure Developer Associate", issuer: "Microsoft", date: "En cours" },
      { title: "AWS Cloud Practitioner", issuer: "AWS", date: "En cours" },
      { title: "Devenir Architecte Logiciel", issuer: "LinkedIn Learning", date: "Décembre 2022" },
      { title: "Formation Développement Web & App", issuer: "Acerfi Cameroun", date: "2016" }
    ],
    experience: [
      {
        role: "Développeur Full Stack",
        company: "COFRD",
        location: "Oshawa, ON, Canada",
        period: "Mars 2023 - Présent",
        responsibilities: [
          "Architecturé et maintenu des applications web full-stack robustes, garantissant de hautes performances, une grande évolutivité et le strict respect des normes de codage modernes.",
          "Collaboré étroitement avec des équipes interfonctionnelles pour recueillir les besoins, concevoir des interfaces intuitives et déployer des solutions de bout en bout.",
          "Optimisé les performances des applications en résolvant des problèmes techniques complexes, améliorant directement les temps de chargement et la qualité globale.",
          "Mis en place des pipelines CI/CD automatisés et des suites de tests unitaires avec Jest, augmentant de manière mesurable la couverture de test et garantissant l'intégrité des modules."
        ],
        achievements: [
          "Piloté le développement d'une plateforme web majeure, entraînant une augmentation de 30% de l'engagement utilisateur et réduisant les temps de chargement de 25%.",
          "Dirigé des initiatives pour l'amélioration de l'UI/UX, obtenant une hausse de 40% de la satisfaction utilisateur et une augmentation de 20% des taux de conversion.",
        ],
      },
      {
        role: "Analyste Programmeur",
        company: "Kolineo",
        location: "Sherbrooke, QC, Canada",
        period: "Septembre 2021 - Décembre 2021",
        responsibilities: [
          "Mené le cycle de développement logiciel en tant qu'Analyste Programmeur, supervisant l'analyse des besoins, le DevOps et les pipelines de déploiement.",
          "Conçu des API REST B2B et des modèles ORM (SQLAlchemy, Python, Django) pour intégrer les systèmes d'entreposage et de redistribution de Kolineo avec des clients entreprises (ex: Amazon, Costco).",
          "Géré l'infrastructure cloud en déployant de manière sécurisée les services backend et l'application frontend Angular sur AWS, incluant la gestion des clés secrètes."
        ],
        achievements: [
          "Déployé avec succès des services d'intégration B2B évolutifs, permettant une synchronisation fluide des données d'entreposage avec de grands distributeurs (Amazon, Costco).",
          "Achevé le mandat d'analyse et de développement en avance sur le calendrier, en déployant de complexes intégrations backend."
        ],
      },
      {
        role: "Ingénieur de Données",
        company: "Université de Sherbrooke",
        location: "Sherbrooke, QC, Canada",
        period: "Janvier 2022 - Mai 2022",
        responsibilities: [
          "Conçu et développé un parseur et linter SQL personnalisé évaluant les requêtes de plus de 250 étudiants, réduisant le temps de correction manuel de 60%.",
          "Créé des pipelines de données automatisés (Python, SQL) traitant des milliers de requêtes pour garantir une précision de 100% lors des évaluations de performance.",
          "Appliqué des techniques d'ingénierie de données avancées pour bâtir un système de notation et de vérification en moins de quatre mois."
        ],
        achievements: [
          "Simplifié le processus de notation académique en automatisant la vérification et les tests de requêtes SQL complexes.",
          "Livré avec succès un outil éducatif fonctionnel, qui a considérablement amélioré la précision et l'efficacité de l'évaluation des travaux des étudiants."
        ],
      },
      {
        role: "Développeur Web & IoT, Coop",
        company: "Olympus NDT Canada",
        location: "Québec, QC, Canada",
        period: "Mai 2021 - Août 2021",
        responsibilities: [
          "Conçu des applications dynamiques avec C#, ASP.NET MVC et Angular 6 au sein d'une équipe agile et pluridisciplinaire.",
          "Participé au cycle complet de développement logiciel, de l'analyse des besoins aux déploiements en production.",
          "Contribué aux fonctionnalités d'intégration IoT, garantissant un flux de données fluide entre le matériel et les tableaux de bord."
        ],
        achievements: [
          "Fourni un code de haute qualité et maintenable, démontrant une solide maîtrise de la stack .NET et Angular.",
          "Réduit de 40% les incidents globaux grâce à un dépannage proactif, des tests rigoureux et des stratégies de résolution efficaces."
        ],
      },
      {
        role: "Développeur Logiciel | Ingénieur QA, Coop",
        company: "SAP Labs Canada",
        location: "Montréal, QC, Canada",
        period: "Janvier 2020 - Avril 2020",
        responsibilities: [
          "Développé des solutions logicielles en utilisant la méthodologie rigoureuse de Test-Driven Development (TDD).",
          "Conçu des tests unitaires complets avec QUnit et OPA5, et réalisé des tests d'intégration d'API avec Postman, assurant la stabilité de l'application.",
          "Participé activement aux cérémonies Agile Scrum avec Jira pour la planification, le suivi et la livraison continue."
        ],
        achievements: [
          "Démontré un fort engagement pour la qualité logicielle en résolvant des anomalies critiques, améliorant grandement les performances.",
          "Maintenu un taux d'achèvement de 100% dans les délais impartis, gérant efficacement le temps et les livrables dans un environnement en évolution rapide."
        ],
      },
      {
        role: "Stagiaire Développeur Web & Designer",
        company: "Creolink Communications",
        location: "Yaoundé, Cameroun",
        period: "2017 - 2018",
        responsibilities: [
          "Initié mon parcours technologique en participant à la refonte web complète pour un fournisseur local majeur de services internet.",
          "Converti des maquettes UI/UX complexes (Photoshop) en interfaces responsives avec HTML, CSS, Bootstrap et JavaScript.",
          "Développé des fonctionnalités dynamiques côté serveur en s'appuyant sur l'architecture PHP et WAMP."
        ],
        achievements: [
          "Modernisé avec succès l'empreinte numérique de l'entreprise, forgeant ainsi une maîtrise absolue des fondamentaux du web."
        ],
      }
    ],
    projects: [
      {
        id: "omnibrain",
        title: "Omnibrain",
        shortDescription: "Application web RAG d'entreprise pour indexer et interroger des médias et documents par l'IA.",
        link: "https://omnibrain.dordorapps.tech/",
        tags: ["React", "Vite", "FastAPI", "Python", "LangChain", "LangGraph", "GitHub Actions", "Docker"],
        caseStudy: {
          challenge: "Les entreprises avaient besoin d'une méthode unifiée pour indexer des médias complexes et des documents internes vers une base de données orientée vecteurs afin d'interroger directement des modèles d'IA de manière contextuelle.",
          solution: "Architecture d'un système RAG utilisant Python et FastAPI pour une structure backend robuste. Intégration de LangChain et LangGraph pour gérer des flux LLM avancés. Réalisation de l'interface frontend réactive sous Vite et React. Mise en place de pipelines CI/CD entièrement automatisés avec GitHub Actions pour les tests et déploiements serveur.",
          impact: "Vectorisé plus de 10 000 documents internes via une architecture évolutive, réduisant le temps de recherche d'information de 80% avec une latence de réponse IA inférieure à la seconde.",
        }
      },
      {
        id: "tradeoffstack",
        title: "TradeoffStack",
        shortDescription: "Outil de gestion IT et logistique interne déployé pour une jeune start-up de gestion d'intérieurs.",
        link: "https://tradeoffstack.dordorapps.tech/",
        tags: ["Vite", "React", ".NET 10", "Entity Framework", "PostgreSQL", "SQLite", "GitHub Actions", "Docker"],
        caseStudy: {
          challenge: "Une jeune entreprise de gestion d'intérieurs avait besoin d'un outil informatique robuste. La contrainte incluait un stockage primaire avec des mécanismes de sauvegarde temporaire, jumelé avec un frontend hautement moderne et réactif.",
          solution: "A conçu et implémenté le backend en .NET 10 et Entity Framework. Utilisation de PostgreSQL en tant que base primaire et intégration de SQLite pour les sauvegardes. Développement frontend sur Vite et React. Mise en place de pipelines CI/CD entièrement automatisés avec GitHub Actions pour les tests continus et les déploiements serveur fluides.",
          impact: "Déployé une plateforme centralisée gérant plus de 50 000 références d'inventaire avec une disponibilité de 99,9%. Optimisation de la logistique permettant d'absorber des centaines de transactions quotidiennes via une infrastructure DevOps robuste.",
        }
      },
      {
        id: "cms-lite",
        title: "CMS Lite (WENZE)",
        shortDescription: "CMS (Content Management System) ultra-léger et drag-and-drop conçu pour les néophytes.",
        link: "#",
        tags: ["Spring Boot", "Lombok", "JavaScript", "HTML", "DevOps"],
        caseStudy: {
          challenge: "Construire un outil de conception de sites en 'drag-and-drop' avec une empreinte très légère, pensé pour les personnes non formées à la programmation. Requis de supporter plusieurs thèmes en conception dynamique.",
          solution: "Développement du backend grâce à l'écosystème Spring Boot et Lombok. Programmation d'un moteur de génération de pages HTML et JS pour de la conception par glisser-déposer sur base de thèmes personnalisés. Emploi régulier de modules DevOps pendant le cycle de vie.",
          impact: "Permis à des utilisateurs néophytes de déployer leur site seul. Le format de thème conçu posa de solides bases pour l'incorporation de futurs thèmes par le reste de l'équipe, et ce d'une manière incroyablement simple.",
        }
      }
    ],
    blogPosts: [
      {
        id: "future-of-llms",
        title: "L'avenir des LLMs en Architecture d'Entreprise",
        date: "15 Octobre 2025",
        excerpt: "Découverte de la manière dont la génération augmentée par la recherche (RAG) transforme l'indexation et la requête de données propriétaires.",
        content: "Les grands modèles de langage (LLM) ne sont plus de simples chatbots ; ils deviennent des composants à part entière de l'architecture d'entreprise. En utilisant le RAG (Retrieval-Augmented Generation), les entreprises peuvent connecter en toute sécurité leurs bases de données internes aux modèles d'IA. Mon travail sur Omnibrain a démontré qu'en vectorisant plus de 10 000 documents, nous pouvons obtenir une latence inférieure à la seconde pour des requêtes complexes, réduisant ainsi le temps de recherche d'informations de 80 %.",
        tags: ["IA", "RAG", "Entreprise"]
      },
      {
        id: "aws-serverless-2026",
        title: "Évolutivité avec AWS Serverless en 2026",
        date: "22 Janvier 2026",
        excerpt: "Une analyse approfondie des raisons pour lesquelles le passage des serveurs monolithiques à AWS Lambda peut réduire les coûts.",
        content: "La gestion des serveurs peut être un lourd fardeau pour les startups en croissance. En passant à des architectures AWS Serverless, les équipes peuvent se concentrer sur le code plutôt que sur l'infrastructure. Des services comme AWS Lambda permettent d'exécuter du code sans provisionner ni gérer de serveurs, en ne payant que pour le temps de calcul consommé. L'adoption du serverless a permis de réduire les frais d'infrastructure de près de 40 % tout en maintenant une disponibilité de 99,9 %.",
        tags: ["AWS", "Cloud", "DevOps"]
      },
      {
        id: "react-three-fiber-ux",
        title: "Web Immersif : React Three Fiber",
        date: "05 Avril 2026",
        excerpt: "Comment l'ajout de composants 3D WebGL aux applications web traditionnelles peut augmenter considérablement l'engagement.",
        content: "Le web passe d'interfaces 2D plates à des expériences spatiales immersives. React Three Fiber (R3F) fournit un pont puissant entre la gestion d'état déclarative de React et le moteur de rendu de Three.js. En implémentant soigneusement des toiles WebGL — telles que des systèmes de particules interactifs et des galeries 3D — les développeurs peuvent créer des sites d'un niveau international. La clé est d'équilibrer la complexité esthétique et les performances mobiles.",
        tags: ["WebGL", "React", "UX"]
      }
    ],
    ui: {
      viewWork: "Voir les projets",
      contactMe: "Me contacter",
      downloadCv: "Télécharger le CV",
      technicalArsenal: "Arsenal Technique",
      professionalPath: "Parcours Professionnel",
      featuredWork: "Projets en Vedette",
      letsConnect: "Restons connectés.",
      contactLead: "Je suis actuellement à la recherche de nouvelles opportunités. Que vous ayez une question ou souhaitiez simplement dire bonjour, je ferai de mon mieux pour vous répondre !",
      availableForCollab: "Disponible pour collaboration",
      theChallenge: "Le Défi",
      theSolution: "La Solution",
      theImpact: "L'Impact",
      viewLiveSite: "Voir le site en direct",
      project: "PROJET",
      certifications: "Certifications",
      osWidget: {
        localEnv: "Env Local",
        sysOk: "SYS_OK",
        weather: {
          clear: "Dégagé",
          sunny: "Ensoleillé",
          cloudy: "Nuageux",
          foggy: "Brouillard",
          rainy: "Pluvieux",
          snowy: "Neigeux",
          stormy: "Orageux",
          unavailable: "Indisponible"
        }
      }
    }
  }
};
