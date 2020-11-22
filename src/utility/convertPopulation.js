export const convertPopulation = population => {
  population = population + ""
  population = population.split("")
  population.reverse()
  let add = 0
  let multiple3 = 0
  if (population.length % 3 === 0) {
    multiple3 = 1
  }
  const places = Math.floor(population.length / 3)
  for (let i = 1; i <= places - multiple3; i++) {
    population.splice(i * 3 + add, 0, ",")
    ++add
  }
  population.reverse()
  population = population.join("")
  return population
}
