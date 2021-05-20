import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

function SelectMenu() {

    let [countries, setCountries] = useState()
    let [countryNames, setCountryNames] = useState([])
    let [states, setStates] = useState()
    let [stateNames, setStateNames] = useState([])
    let [cities, setCities] = useState()
    let [cityNames, setCityNames] = useState([])
    let [stateValue, setStateValue] = useState({ label: "Select State", value: null })
    let [cityValue, setCityValue] = useState({ label: "Select City", value: null })
    let [isStateDisable, SetIsStateDisable] = useState(true)
    let [isCityDisable, SetIsCityDisable] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/countries')
            .then((response) => {
                setCountries(countries = response.data)
                setCountryNames(countryNames = countries.map((element) => {
                    return { label: element.countryName, value: element.countryName, id: element.id }
                }))
            })
    }, [])

    const onCountrySelect = (value) => {
        axios.get(`http://localhost:8000/states?countryId=${value.id}`)
            .then((response) => {
                setStates(states = response.data)
                SetIsStateDisable(isStateDisable = false)
                setStateValue(stateValue = { label: "Select State", value: null })
                setCityValue(cityValue = { label: "Select City", value: null })
                setStateNames(stateNames = states.map((element) => {
                    return { label: element.stateName, value: element.stateName, id: element.id }
                }))
            })
    }

    const onStateSelect = (value) => {
        axios.get(`http://localhost:8000/cities?stateId=${value.id}`)
            .then((response) => {
                setCities(cities = response.data)
                SetIsCityDisable(isCityDisable = false)
                setStateValue(stateValue = value)
                setCityValue(cityValue = { label: "Select City", value: null })
                setCityNames(cityNames = cities.map((element) => {
                    return { label: element.stateName, value: element.stateName, id: element.id }
                }))
            })
    }

    const onCitySelect = (value) => {
        setCityValue(cityValue = value)
    }

    return (
        <div>
            <h3>Select your country</h3>
            <Select
                options={countryNames}
                onChange={onCountrySelect}
                defaultValue={{ label: "Select Country", value: null }}
            />
            <h3>Select your state</h3>
            <Select
                options={stateNames}
                onChange={onStateSelect}
                defaultValue={{ label: "Select State", value: null }}
                isDisabled={isStateDisable}
                value ={stateValue}
            />
            <h3>Select your city</h3>
            <Select
                options={cityNames}
                onChange={onCitySelect}
                defaultValue={{ label: "Select City", value: null }}
                isDisabled={isCityDisable}
                value={cityValue}
            />
        </div>
    )
}

export default SelectMenu
