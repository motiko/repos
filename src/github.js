export async function orgRepositories(organization) {
  const parsedResponse = await getJson(`/orgs/${organization}/repos`);
  const repos = parsedResponse.map(r => ({
    name: r.name,
    full_name: r.full_name,
    stars: r.stargazers_count,
    language: r.language || "N/A",
    forks: r.forks_count
  }));
  return repos;
}

export async function repoBrnaches(fullName) {
  const parsedResponse = await getJson(`/repos/${fullName}/branches`);
  const branches = parsedResponse.map(b => ({
    name: b.name
  }));
  return branches;
}

async function getJson(path) {
  const response = await fetch(`https://api.github.com${path}`);
  if (response.ok) return response.json();
  else {
    throw new Error(response.statusText);
  }
}
