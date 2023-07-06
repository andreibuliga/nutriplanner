import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../features/auth/authService'
import axios from 'axios'

const RecipeForm = ({ initialValues }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  })
  const [previewImage, setPreviewImage] = useState(
    initialValues?.imageUrl || ''
  )

  React.useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const onSubmitForm = async (data) => {
    const token = authService.getToken()
    try {
      await axios.post('/api/recipes', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Recipe created successfully!')
      reset()
    } catch (error) {
      console.error('Error creating recipe:', error)
    }
  }

  const handleImageUrlChange = (e) => {
    setPreviewImage(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className='recipe-form'>
      <input
        {...register('title')}
        placeholder='Title'
        required
        className='recipe-form__input'
      />
      <textarea
        {...register('description')}
        placeholder='Description'
        required
        className='recipe-form__textarea'
      />

      {initialValues?.ingredients?.map((ingredient, index) => (
        <div key={index} className='recipe-form__ingredient'>
          <input
            {...register(`ingredients[${index}].name`)}
            placeholder='Ingredient name'
            required
            className='recipe-form__input'
          />
          <input
            {...register(`ingredients[${index}].quantity`)}
            placeholder='Quantity'
            required
            className='recipe-form__input'
          />
          <input
            {...register(`ingredients[${index}].unit`)}
            placeholder='Unit'
            required
            className='recipe-form__input'
          />
        </div>
      ))}

      <textarea
        {...register('instructions')}
        placeholder='Instructions (each line is a separate instruction)'
        required
        className='recipe-form__textarea'
      />

      <input
        {...register('imageUrl')}
        placeholder='Image URL'
        onChange={handleImageUrlChange}
        className='recipe-form__input'
      />

      {previewImage && (
        <img
          src={previewImage}
          alt='Preview'
          width='200'
          className='recipe-form__image-preview'
        />
      )}

      <input
        {...register('totalCalories')}
        placeholder='Total Calories'
        required
        className='recipe-form__input'
      />
      <input
        {...register('macros.protein')}
        placeholder='Protein'
        required
        className='recipe-form__input'
      />
      <input
        {...register('macros.fat')}
        placeholder='Fat'
        required
        className='recipe-form__input'
      />
      <input
        {...register('macros.carbohydrates')}
        placeholder='Carbohydrates'
        required
        className='recipe-form__input'
      />

      <button type='submit' className='recipe-form__submit-button'>
        Submit
      </button>
    </form>
  )
}

export default RecipeForm
