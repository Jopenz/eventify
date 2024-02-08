import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number().required(),
  title: yup.string().required('Title is required'),
  date: yup.date().min(new Date(), 'Date must be in the future').required('Date is required').nullable().default(undefined),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
  image: yup.string().required('Image is required'),
  isFeatured: yup.boolean().required(),
  category: yup.string().required('Category is required'),
  organizer: yup
    .object()
    .shape({
      id: yup.number().required(),
      name: yup.string().required(),
      email: yup.string().required(),
      avatar: yup.string().required(),
    })
    .required(),
  price: yup.number().notRequired(),
  followers: yup
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
  latitude: yup.number().min(-90).max(90).notOneOf([0]).required(),
  longitude: yup.number().min(-180).max(180).notOneOf([0]).required(),
});

export default schema;
