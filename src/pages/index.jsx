import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

const Home = ({ initialLocations }) => {
  const [locations, setLocations] = useState(initialLocations)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [filterType, setFilterType] = useState("")

  useEffect(() => {
    if (filter === "Tous") {
      setFilter("")
    }

    const filteredLocations = initialLocations.filter((location) => {
      const matchSearch = location.nom
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchFilter = filter
        ? location.typeDeLieu.type.toLowerCase() === filter.toLowerCase()
        : true
      let matchFilterType = true

      if (filterType) {
        switch (filter) {
          case "Restaurant":
            matchFilterType =
              location.typeDeLieu.details.typeOfRestaurant === filterType
            break
          case "Musée":
            matchFilterType =
              location.typeDeLieu.details.courantArtistique === filterType
            break
          case "Bar":
            matchFilterType =
              location.typeDeLieu.details.typeOfBar === filterType
            break
          case "Parc":
            matchFilterType =
              location.typeDeLieu.details.typeOfParc === filterType
            break
          default:
            break
        }
      }

      return matchSearch && matchFilter && matchFilterType
    })

    setLocations(filteredLocations)
  }, [search, filter, filterType, initialLocations])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value)
  }

  const getTypeOptions = (type) => {
    const uniqueTypes = new Set(
      locations
        .filter((location) => location.typeDeLieu.type === type)
        .map((location) => location.typeDeLieu.details[`typeOf${type}`])
    )
    return Array.from(uniqueTypes)
  }

  return (
    <main>
      <h1 className="text-2xl font-bold text-center text-white">Locations</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher une location"
          className="border-2 border-gray-200 p-2 m-2"
          onChange={handleSearchChange}
          value={search}
        />
        <div>
          <label htmlFor="filter" className="text-white">
            Trier par
          </label>
          <select id="filter" onChange={handleFilterChange} value={filter}>
            <option value="">Tous</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Musee">Musée</option>
            <option value="Bar">Bar</option>
            <option value="Parc">Parc</option>
          </select>
        </div>
        {filter && (
          <div>
            <label
              htmlFor="filterType"
              className="text-white"
            >{`Type de ${filter}`}</label>
            <select
              id="filterType"
              onChange={handleFilterTypeChange}
              value={filterType}
            >
              <option value="">Tous</option>
              {getTypeOptions(filter).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        <ul>
          {locations.map((location) => (
            <Link href={`/locations/${location._id}`} key={location._id}>
              <li className="bg-gray-100 p-4 m-2 rounded-lg flex items-center">
                <h2 className="text-xl font-bold pl-2">{location.nom} </h2>
                <p className="text-xl font-bold pl-2">
                  - {location.adresse.numero}
                </p>
                <p className="text-xl font-bold pl-2">{location.adresse.rue}</p>
                <p className="text-xl font-bold pl-2">
                  {location.adresse.ville}
                </p>
                <p className="text-xl font-bold pl-2">
                  - {location.typeDeLieu.type}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/locations")
    const initialLocations = response.data
    return {
      props: { initialLocations },
    }
  } catch (error) {
    console.error("Failed to fetch locations", error)
    return {
      props: { initialLocations: [] },
    }
  }
}

export default Home
