import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // valida entradas dos paramentros do controller
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // verifica se foi passado algo no body da requesição http
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de validacão' });
    }

    // verifica se o email do user já está cadastrado na base de dados
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      res.status(400).json({ error: 'Email já foi cadastrado!' });
    }
    //  retorna name, email, password_hash e provider do nodo user criado na base de dados
    const { name, email, password_hash, provider } = await User.create(
      req.body
    );

    // retorna informações do user criado via json
    return res.json({
      name,
      email,
      password_hash,
      provider,
    });
  }

  async update(req, res) {
    const { oldpassword, email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        res.status(400).json({ error: 'Email já foi cadastrado!' });
      }
    }

    if (oldpassword && !(await user.checkPassword(oldpassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
