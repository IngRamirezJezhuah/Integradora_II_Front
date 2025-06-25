export const filterData = (data, searchText) => {
  if (!searchText) return data; // Return original data if search is empty

  const lowerSearchText = searchText.toLowerCase();

  return data.filter(item => {
    // Check top-level fields
    const matchesTopLevel = (
      String(item.nameUsuario).toLowerCase().includes(lowerSearchText) ||
      String(item.status).toLowerCase().includes(lowerSearchText) ||
      String(item.descripcion).toLowerCase().includes(lowerSearchText)
    );

    // Check procedimientos.titulo
    const matchesProcedimientos = item.procedimientos.some(proc =>
      String(proc.titulo).toLowerCase().includes(lowerSearchText)
    );

    return matchesTopLevel || matchesProcedimientos;
  });
};