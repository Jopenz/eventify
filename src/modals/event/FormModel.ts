import * as yup from 'yup';

const schema = yup.object({
  id: yup.number().required(),
  title: yup.string().required(),
  date: yup.string().required(),
  location: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required(),
  isFeatured: yup.boolean().required(),
  category: yup.string().required(),
  organizer: yup
    .object()
    .shape({
      id: yup.number().required(),
      name: yup.string().required(),
      email: yup.string().required(),
      avatar: yup.string().required(),
    })
    .required(),
  price: yup.number().positive().required(),
  confirmed: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        avatar: yup.string().required(),
      })
    )
    .required(),
  status: yup.string().required(),
  createdAt: yup.string().required(),
  updatedAt: yup.string().required(),
  coordinate: yup
    .object()
    .shape({
      latitude: yup.number().required(),
      longitude: yup.number().required(),
    })
    .required(),
  file: yup.array().required(),
});

export default schema;
