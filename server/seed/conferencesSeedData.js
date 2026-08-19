// Data below is transcribed from the original frontend's
// src/data/conferences.js and src/data/proceedings.js so the database
// starts out with the same conferences the static site used to show.
// proceedingsIds relationships have been converted into embedded
// scopusPublications arrays, matching the Conference model.

const proceedings = {
  icp: {
    title: "Innovation Conference Proceedings (ICP)",
    subtitle: "Multidisciplinary Sciences & Engineering",
    publisher: "CRC Press (Taylor & Francis Group)",
    indexedIn: "Scopus",
    issn: "2630-6389",
    publicationStatus: "Indexed",
  },
  "its-p": {
    title: "Innovation in Technology and Science Proceedings (ITS-P)",
    subtitle: "Technology & Applied Sciences",
    publisher: "AIP Publishing",
    indexedIn: "Scopus",
    issn: "2473-0531",
    publicationStatus: "Indexed",
  },
  assep: {
    title: "Advances in Social Sciences & Education (ASSEP)",
    subtitle: "Social Sciences & Education",
    publisher: "European Proceedings (EP International)",
    indexedIn: "Scopus",
    issn: "2672-815X",
    publicationStatus: "Indexed",
  },
  ihlsp: {
    title: "Innovation in Health and Life Sciences Proceedings (IHLSP)",
    subtitle: "Health, Medicine & Life Sciences",
    publisher: "EDP Sciences",
    indexedIn: "Scopus",
    issn: "2672-8964",
    publicationStatus: "Indexed",
  },
  setp: {
    title: "Sustainable Engineering and Technology Proceedings (SETP)",
    subtitle: "Sustainable Engineering & Technology",
    publisher: "Springer Nature (Part of Springer)",
    indexedIn: "Scopus",
    issn: "2662-8081",
    publicationStatus: "Indexed",
  },
};

function pubs(...ids) {
  return ids.map((id) => ({ ...proceedings[id] }));
}

const conferences = [
  {
    title: "International Conference on Entomology and Sustainable Solutions",
    acronym: "EntomoSphere 2026",
    theme: "Insects for a Sustainable Future",
    mode: "In Person",
    startDate: new Date("2026-12-19"),
    endDate: new Date("2026-12-20"),
    dateLabel: "19-20 DEC 2026",
    dateRange: "December 19-20, 2026",
    city: "Indore",
    country: "India",
    location: "Indore, India",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "EntomoSphere 2026 brings together entomologists, ecologists and sustainability researchers to explore the role of insects in building resilient ecosystems and sustainable solutions for agriculture, health and the environment. The conference offers a multidisciplinary platform for original research, case studies and collaborative dialogue.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "August 30, 2026" },
      { label: "Full Paper Submission Deadline", date: "October 10, 2026" },
      { label: "Notification of Acceptance", date: "November 5, 2026" },
      { label: "Early Bird Registration Deadline", date: "November 20, 2026" },
      { label: "Conference Dates", date: "December 19-20, 2026" },
    ],
    submissionInfo:
      "Authors are invited to submit original, unpublished research papers through the online submission portal. All submissions undergo a rigorous double-blind peer review process assessing originality, relevance and academic quality before acceptance.",
    registrationInfo:
      "Registration includes access to all technical sessions, conference kit, certificate of presentation, and publication processing. Early bird discounts are available for registrations completed before the early bird deadline.",
    publicationInfo:
      "Accepted and presented papers will be published in the Innovation Conference Proceedings (ICP), indexed in Scopus, with each paper assigned a DOI for global visibility and citation tracking.",
    contactEmail: "entomosphere@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    featured: true,
    scopusPublications: pubs("icp", "ihlsp"),
  },
  {
    title: "International Conference on AI, Innovation and Emerging Technologies",
    acronym: "ICAIET 2027",
    theme: "Intelligent Solutions for Global Challenges",
    mode: "Hybrid",
    startDate: new Date("2027-02-25"),
    endDate: new Date("2027-02-27"),
    dateLabel: "25-27 FEB 2027",
    dateRange: "February 25-27, 2027",
    city: "Kuala Lumpur",
    country: "Malaysia",
    location: "Kuala Lumpur, Malaysia",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "ICAIET 2027 is a premier hybrid conference dedicated to advances in artificial intelligence, machine learning and emerging technologies. It provides a platform for researchers, engineers and innovators to present intelligent solutions addressing global technological and societal challenges.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "October 15, 2026" },
      { label: "Full Paper Submission Deadline", date: "December 15, 2026" },
      { label: "Notification of Acceptance", date: "January 10, 2027" },
      { label: "Early Bird Registration Deadline", date: "January 25, 2027" },
      { label: "Conference Dates", date: "February 25-27, 2027" },
    ],
    submissionInfo:
      "Original research papers, technical notes and case studies are welcome via the online submission system. Every submission is peer reviewed by at least two independent reviewers from our international technical committee.",
    registrationInfo:
      "In-person and virtual registration options are available. All registered participants receive conference materials, session access, and a digital certificate of participation or presentation.",
    publicationInfo:
      "Accepted papers will be published in the Innovation in Technology and Science Proceedings (ITS-P), indexed in Scopus, with global discoverability through the publisher's digital library.",
    contactEmail: "icaiet@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    featured: true,
    scopusPublications: pubs("its-p", "icp"),
  },
  {
    title: "Global Conference on Sustainability in Science and Engineering",
    acronym: "GCSSE 2027",
    theme: "Engineering a Sustainable and Resilient World",
    mode: "Hybrid",
    startDate: new Date("2027-04-15"),
    endDate: new Date("2027-04-17"),
    dateLabel: "15-17 APR 2027",
    dateRange: "April 15-17, 2027",
    city: "Barcelona",
    country: "Spain",
    location: "Barcelona, Spain",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "GCSSE 2027 convenes engineers, scientists and policy makers to advance sustainable engineering practices and resilient infrastructure. The conference emphasizes research aligned with the UN Sustainable Development Goals across energy, construction and environmental engineering.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "December 20, 2026" },
      { label: "Full Paper Submission Deadline", date: "February 10, 2027" },
      { label: "Notification of Acceptance", date: "March 1, 2027" },
      { label: "Early Bird Registration Deadline", date: "March 15, 2027" },
      { label: "Conference Dates", date: "April 15-17, 2027" },
    ],
    submissionInfo:
      "Authors may submit full papers or extended abstracts through the online portal. Submissions are evaluated for originality, technical soundness and contribution to sustainable engineering practice.",
    registrationInfo:
      "Flexible in-person and hybrid registration packages are available, including access to workshops, keynote sessions and networking events with global experts.",
    publicationInfo:
      "Accepted papers will be published in the Sustainable Engineering and Technology Proceedings (SETP), indexed in Scopus and distributed through Springer's global platform.",
    contactEmail: "gcsse@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    scopusPublications: pubs("setp", "icp"),
  },
  {
    title: "International Conference on Health, Medicine and Life Sciences",
    acronym: "ICHMLS 2027",
    theme: "Advancing Health for Better Tomorrow",
    mode: "In Person",
    startDate: new Date("2027-06-10"),
    endDate: new Date("2027-06-12"),
    dateLabel: "10-12 JUN 2027",
    dateRange: "June 10-12, 2027",
    city: "Boston",
    country: "USA",
    location: "Boston, USA",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "ICHMLS 2027 unites clinicians, biomedical researchers and public health experts to share breakthroughs in health, medicine and the life sciences. The conference fosters collaboration on research that improves patient outcomes and advances global health equity.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "February 20, 2027" },
      { label: "Full Paper Submission Deadline", date: "April 20, 2027" },
      { label: "Notification of Acceptance", date: "May 10, 2027" },
      { label: "Early Bird Registration Deadline", date: "May 25, 2027" },
      { label: "Conference Dates", date: "June 10-12, 2027" },
    ],
    submissionInfo:
      "Research papers, clinical case studies and review articles are accepted through the online submission system, subject to rigorous peer review by our expert medical and scientific committee.",
    registrationInfo:
      "In-person registration includes full access to scientific sessions, poster exhibitions, networking receptions and a certificate of presentation.",
    publicationInfo:
      "Accepted papers will be published in the Innovation in Health and Life Sciences Proceedings (IHLSP), indexed in Scopus, ensuring wide readership across the medical research community.",
    contactEmail: "ichmls@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    scopusPublications: pubs("ihlsp", "icp"),
  },
  {
    title: "International Conference on AI, Data Science & Innovation",
    acronym: "ICADSI 2026",
    theme: "Shaping Tomorrow Through Data and Intelligence",
    mode: "Hybrid",
    startDate: new Date("2026-09-20"),
    endDate: new Date("2026-09-22"),
    dateLabel: "20-22 SEP 2026",
    dateRange: "September 20-22, 2026",
    city: "Singapore",
    country: "Singapore",
    location: "Singapore",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "ICADSI 2026 brings together leading researchers and practitioners in artificial intelligence and data science to explore innovative solutions for real-world problems. The conference features keynote sessions, technical paper presentations and panel discussions on the future of intelligent systems.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "May 15, 2026" },
      { label: "Full Paper Submission Deadline", date: "July 10, 2026" },
      { label: "Notification of Acceptance", date: "August 5, 2026" },
      { label: "Early Bird Registration Deadline", date: "August 20, 2026" },
      { label: "Conference Dates", date: "September 20-22, 2026" },
    ],
    submissionInfo:
      "Papers are peer reviewed by an international committee for originality, technical quality and relevance to AI and data science research.",
    registrationInfo:
      "Participants have access to hybrid attendance options with full session recordings made available post-conference.",
    publicationInfo:
      "Accepted papers will be published in the Innovation in Technology and Science Proceedings (ITS-P), indexed in Scopus.",
    contactEmail: "icadsi@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    scopusPublications: pubs("its-p", "icp"),
  },
  {
    title: "Global Conference on Sustainability, Engineering & Technology",
    acronym: "GCSSE 2026",
    theme: "Building a Resilient and Sustainable Future",
    mode: "Hybrid",
    startDate: new Date("2026-05-18"),
    endDate: new Date("2026-05-20"),
    dateLabel: "18-20 MAY 2026",
    dateRange: "May 18-20, 2026",
    city: "Dubai",
    country: "UAE",
    location: "Dubai, UAE",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "GCSSE 2026 gathered engineers and sustainability experts from over 40 countries to discuss cutting-edge research in sustainable engineering, renewable energy and green technology.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "January 15, 2026" },
      { label: "Full Paper Submission Deadline", date: "March 10, 2026" },
      { label: "Notification of Acceptance", date: "April 5, 2026" },
      { label: "Early Bird Registration Deadline", date: "April 20, 2026" },
      { label: "Conference Dates", date: "May 18-20, 2026" },
    ],
    submissionInfo: "All submitted papers underwent double-blind peer review prior to acceptance and publication.",
    registrationInfo:
      "The conference welcomed both in-person and virtual delegates with full access to workshops and networking sessions.",
    publicationInfo:
      "Accepted papers were published in the Sustainable Engineering and Technology Proceedings (SETP), indexed in Scopus.",
    contactEmail: "gcsse@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    scopusPublications: pubs("setp", "icp"),
  },
  {
    title: "International Conference on Management, Social Sciences & Education",
    acronym: "ICMSME 2026",
    theme: "Shaping Inclusive Societies Through Research",
    mode: "In Person",
    startDate: new Date("2026-03-25"),
    endDate: new Date("2026-03-27"),
    dateLabel: "25-27 MAR 2026",
    dateRange: "March 25-27, 2026",
    city: "Bangkok",
    country: "Thailand",
    location: "Bangkok, Thailand",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "ICMSME 2026 provided a forum for scholars in management, social sciences and education to exchange research addressing inclusive growth, policy innovation and pedagogy.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "November 15, 2025" },
      { label: "Full Paper Submission Deadline", date: "January 10, 2026" },
      { label: "Notification of Acceptance", date: "February 5, 2026" },
      { label: "Early Bird Registration Deadline", date: "February 20, 2026" },
      { label: "Conference Dates", date: "March 25-27, 2026" },
    ],
    submissionInfo:
      "Papers were evaluated by subject-matter reviewers for contribution to management, social science and education research.",
    registrationInfo:
      "In-person delegates received full conference access including proceedings, certificates and cultural networking events.",
    publicationInfo:
      "Accepted papers were published in the Advances in Social Sciences & Education (ASSEP) proceedings, indexed in Scopus.",
    contactEmail: "icmsme@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    scopusPublications: pubs("assep"),
  },
  {
    title: "International Conference on Emerging Science, Innovation & Technology",
    acronym: "ICESIT 2026",
    theme: "Innovation Without Borders",
    mode: "In Person",
    startDate: new Date("2026-01-10"),
    endDate: new Date("2026-01-12"),
    dateLabel: "10-12 JAN 2026",
    dateRange: "January 10-12, 2026",
    city: "Perth",
    country: "Australia",
    location: "Perth, Australia",
    organizer: "Innovation Conferences Organizing Committee",
    description:
      "ICESIT 2026 opened the year with a multidisciplinary showcase of emerging science and technology research from across the Asia-Pacific region and beyond.",
    importantDates: [
      { label: "Abstract Submission Deadline", date: "August 15, 2025" },
      { label: "Full Paper Submission Deadline", date: "October 10, 2025" },
      { label: "Notification of Acceptance", date: "November 5, 2025" },
      { label: "Early Bird Registration Deadline", date: "November 20, 2025" },
      { label: "Conference Dates", date: "January 10-12, 2026" },
    ],
    submissionInfo:
      "Submissions spanned engineering, computer science and applied sciences and were reviewed by an international panel of experts.",
    registrationInfo:
      "In-person registration included welcome reception, technical sessions, poster exhibition and closing gala dinner.",
    publicationInfo: "Accepted papers were published in the Innovation Conference Proceedings (ICP), indexed in Scopus.",
    contactEmail: "icesit@innovationconferences.org",
    contactPhone: "+91 12345 67890",
    scopusPublications: pubs("icp"),
  },
];

module.exports = conferences;
