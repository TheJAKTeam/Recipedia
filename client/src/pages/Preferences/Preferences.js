import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { toast } from 'react-toastify'

import preferenceStyle from './Preferences.module.css'
import formStyle from '../../commonStyles/Form.module.css'

const dietOptions = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'high-fiber', label: 'High-Fiber' },
  { value: 'high-protein', label: 'High-Protein' },
  { value: 'low-carb', label: 'Low-Carb' },
  { value: 'low-fat', label: 'Low-Fat' },
  { value: 'low-sodium', label: 'Low-Sodium' }
]

const healthOptions = [
  { value: 'alcohol-free', label: 'Alcohol-free' },
  { value: 'immuno-supportive', label: 'Immune-Supportive' },
  { value: 'celery-free', label: 'Celery-free' },
  { value: 'dairy-free', label: 'Dairy/lactose-free' },
  { value: 'egg-free', label: 'Eggs-free' },
  { value: 'fish-free', label: 'Fish-free' },
  { value: 'fodmap-free', label: 'FODMAP free' },
  { value: 'gluten-free', label: 'Gluten' },
  { value: 'keto-friendly', label: 'Keto' },
  { value: 'kidney-friendly', label: 'Kidney friendly' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'low-potassium', label: 'Low potassium' },
  { value: 'lupine-free', label: 'Lupine-free' },
  { value: 'mustard-free', label: 'Mustard-free' },
  { value: 'no-oil-added', label: 'No oil added' },
  { value: 'low-sugar', label: 'Low-sugar' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'peanut-free', label: 'Peanut-free' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'pork-free', label: 'Pork-free' },
  { value: 'red-meat-free', label: 'Read meat-free' },
  { value: 'sesame-free', label: 'Sesame-free' },
  { value: 'shellfish-free', label: 'Shellfish-free' },
  { value: 'soy-free', label: 'Soy-free' },
  { value: 'sugar-conscious', label: 'Sugar-conscious' },
  { value: 'tree-nut-free', label: 'Tree Nut free' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'wheat-free', label: 'Wheat-free' }
]

const mealTypeOptions = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
  { value: 'teatime', label: 'Teatime' }
]

const Preferences = () => {
  const dietForm = useForm()
  const healthForm = useForm()
  const mealTypeForm = useForm()

  const [preferencesLoading, setPreferencesLoading] = useState(true)

  useEffect(() => {
    const getUserPreferences = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/users/recipePreferences`,
        { credentials: 'include' }
      )

      const preferences = await response.json()
      dietForm.setValue(
        'preferences',
        dietOptions.filter(option => preferences.diet.includes(option.value))
      )
      healthForm.setValue(
        'preferences',
        healthOptions.filter(option =>
          preferences.health.includes(option.value)
        )
      )

      setPreferencesLoading(false)
    }

    getUserPreferences()
  }, [])

  return (
    <div>
      <h1>Search Preferences</h1>
      <p className={preferenceStyle.description}>
        Set your search preferences here to filter out returned recipes and get
        results tailored to your dietary restrictions and needs. Be careful not
        to set too many filters, or the application might return little to no
        results at all.
      </p>

      <PreferenceSection
        type='diet'
        label='Diet'
        options={dietOptions}
        form={dietForm}
        disabled={preferencesLoading}
      />

      <PreferenceSection
        type='health'
        label='Health'
        options={healthOptions}
        form={healthForm}
        disabled={preferencesLoading}
      />

      <PreferenceSection
        type='mealType'
        label='Meal Type'
        options={mealTypeOptions}
        form={mealTypeForm}
        disabled={preferencesLoading}
      />
    </div>
  )
}

const PreferenceSection = props => {
  const { type, label, options, form, disabled } = props

  const [saving, setSaving] = useState(false)

  const savePreferenceType = async (data, type) => {
    setSaving(true)

    try {
      const preferencesArray = data.preferences.map(
        preference => preference.value
      )
      const reqBody = {
        type: type,
        preferenceNames: preferencesArray
      }

      await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/users/recipePreferences`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        }
      )

      toast.success(`Your ${label} preferences have been successfully saved.`)
    } catch (err) {
      console.error(err)
      toast.error(
        `An error occurred while saving your ${label} preferences. Please try again.`
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className={preferenceStyle.preferenceSection}>
      <label>{label}</label>
      <form
        onSubmit={form.handleSubmit(data => savePreferenceType(data, type))}
      >
        <Controller
          control={form.control}
          name='preferences'
          render={({ field }) => {
            return (
              <Select
                {...field}
                options={options}
                placeholder={
                  disabled
                    ? 'Loading...'
                    : `Select one or more ${label} preferences...`
                }
                isDisabled={disabled || saving}
                isMulti
              />
            )
          }}
        />

        <div className={formStyle.submitButtonContainer}>
          <button
            className='btn btn-primary'
            type='submit'
            disabled={disabled || saving}
          >
            {saving
              ? `Saving ${label} Preferences...`
              : `Save ${label} Preferences`}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Preferences
