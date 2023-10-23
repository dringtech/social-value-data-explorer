export async function load({ parent, route }) {
  const { framework } = await parent();
  const thisTheme = framework.themes.find(x => x.id === route.id.split('/').pop());
  return {
    theme: thisTheme,
  }
}