class UsersController {
  constructor(service) {
    /**
     * @type {import('./users-service').UsersService}')}
     */
    this.usersService = service;

    this.signIn = this.signIn.bind(this);
    this.register = this.register.bind(this);
    this.getSellers = this.getSellers.bind(this);
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    const result = await this.usersService.signIn(email, password);
    return res.json(result);
  }

  async register(req, res) {
    const { name, email, password } = req.body;
    const result = await this.usersService.register(name, email, password);
    return res.status(201).json(result);
  }

  async getSellers(req, res) {
    const result = await this.usersService.getSellers();
    return res.json(result);
  }
}

module.exports = { UsersController };
