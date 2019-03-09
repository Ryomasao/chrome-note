import React from 'react'
import styled from 'styled-components'
import { Formik, Form, Field , ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const baseUrl = 'https://ote-8bb7c.firebaseio.com'

const INITIAL_STATE = {
  data: {
    beforeText: '',
    afterText: '',
    note: '',
  },
}

const FormSchema = Yup.object().shape({
  data: Yup.object({
    beforeText: Yup.string()
      .required('Required'),
    afterText: Yup.string()
      .required('Required'),
    })
});

const handleSubmit = async (values, actions) => {
  const postUrl = `${baseUrl}/word.json`
  const postData = { 
    ...values.data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
   }
  await axios.post(postUrl, postData)
  .catch(res => {
    console.log(actions)
  })
  actions.resetForm()
}

const NoteForm = () => (
  <div>
    <Formik 
      initialValues={INITIAL_STATE}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
      render={({
        values,
        isSubmitting
      }) => {
        if(isSubmitting) {
          return (
            <div>
              ほぞんちゅう
            </div>
          )
        }

        if(values.apiError) {
          return (
            <div>
             APIでエラー: {values.apiError}
            </div>
          )
        }
        
        return (
          <Form>
            <Row>
              <Label>
                <label htmlFor="beforeText">English</label>
              </Label>
              <Field 
                type="text" 
                id="beforeText" 
                name="data.beforeText" 
                placeholder="type any words..."
              />
              <ErrorMessage name="data.beforeText" />
            </Row>
            <Row>
              <Label>
                <label htmlFor="afterText">日本語</label>
              </Label>
              <Field 
                type="text" 
                id="afterText" 
                name="data.afterText" 
                placeholder="日本語を入力"
              />
              <ErrorMessage name="data.afterText" />
            </Row>

            <Row>
              <Label>
                <label htmlFor="note">その他</label>
              </Label>
              <Field  
                id="note" 
                name="data.note" 
                component="textarea" 
                placeholder="適当なメモ"
              />
            </Row>
            <Row>
              <button type="submit">保存する</button>
            </Row>
          </Form>
        )
      }}
    />
  </div>
)

const Row = styled.div`
`

const Label = styled.div`
`

export default NoteForm
