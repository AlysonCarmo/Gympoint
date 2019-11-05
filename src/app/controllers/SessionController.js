import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    // utilizando o yup para validar entrada - criando schema
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    // utilizando o yup para validar entrada - validando entrada
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de validação' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name } = user;
    console.log(id);

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, { expiresIn: auth.expiresIn }),
    });
  }
}

export default new SessionController();
