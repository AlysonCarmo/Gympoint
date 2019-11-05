import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    // utilizando o yup para validar entrada - criando schema
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      weihth: Yup.string().required(),
      heigth: Yup.string().required(),
    });

    console.log(schema.isValid(req.body));
    console.log(req.body);

    await schema.isValid(req.body).then(function(valid) {
      console.log(valid); // => true
    });
    // utilizando o yup para validar entrada - validando entrada
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de validação' });
    }

    // eslint-disable-next-line prettier/prettier
    const studentExists = await Student.findOne({ where: { email: req.body.email } });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'Já possui um estudante com esse email.' });
    }

    const { email, name, age, weigth, heigth, provider } = await Student.create(
      req.body
    );

    return res.json({ name, email, age, weigth, heigth, provider });
  }

  async update(req, res) {
    // utilizando o yup para validar entrada - criando schema
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
      age: Yup.number(),
      weihth: Yup.number(),
      heigth: Yup.number(),
    });

    // utilizando o yup para validar entrada - validando entrada
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de validação' });
    }

    const studentExists = await Student.findByPk(req.body.id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const {
      id,
      name,
      email,
      age,
      weigth,
      heigth,
      provider,
    } = await studentExists.update(
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        weigth: req.body.weigth,
        heigth: req.body.heigth,
        provider: req.body.provider,
      },
      { where: req.body.id }
    );

    return res.json({ id, name, email, age, weigth, heigth, provider });
  }
}

export default new StudentController();
