export async function load({ parent, route }) {
  const { framework } = await parent();
  const [ outcomeId, themeId, ..._rest] = route.id.split('/').reverse();
  const thisTheme = framework.themes.find(x => x.id === themeId);
  const thisOutcome = thisTheme.outcomes.find(x => x.id === outcomeId);
  return {
    theme: thisTheme,
    outcome: thisOutcome,
  }
}