export function hireMailto(profile) {
  const subject = `Hiring enquiry — ${profile.name}`
  const body = `Hi ${profile.name},\n\nI came across your portfolio and would like to talk about a role.\n\n`
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
