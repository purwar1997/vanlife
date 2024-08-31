import { createServer, Model, Response } from 'miragejs';

createServer({
  models: {
    van: Model,
    user: Model,
  },

  seeds(server) {
    server.create('van', {
      id: '1',
      name: 'Modest Explorer',
      price: 60,
      description:
        'The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!',
      imageUrl:
        'https://res.cloudinary.com/dlqnx5pot/image/upload/v1725143426/modest-explorer_klquqc.png',
      type: 'simple',
      hostId: '123',
    });
    server.create('van', {
      id: '2',
      name: 'Beach Bum',
      price: 80,
      description:
        "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
      imageUrl:
        'https://res.cloudinary.com/dlqnx5pot/image/upload/v1725143358/beach-bum_nonqr2.png',
      type: 'rugged',
      hostId: '123',
    });
    server.create('van', {
      id: '3',
      name: 'Reliable Red',
      price: 100,
      description:
        "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
      imageUrl:
        'https://res.cloudinary.com/dlqnx5pot/image/upload/v1725143443/reliable-red_b6zooz.png',
      type: 'luxury',
      hostId: '123',
    });
    server.create('van', {
      id: '4',
      name: 'Dreamfinder',
      price: 65,
      description:
        'Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.',
      imageUrl:
        'https://res.cloudinary.com/dlqnx5pot/image/upload/v1725143372/dreamfinder_mepbhu.png',
      type: 'simple',
      hostId: '123',
    });
    server.create('van', {
      id: '5',
      name: 'The Cruiser',
      price: 120,
      description:
        'The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.',
      imageUrl:
        'https://res.cloudinary.com/dlqnx5pot/image/upload/v1725143458/the-cruiser_oocu1i.png',
      type: 'luxury',
      hostId: '456',
    });
    server.create('van', {
      id: '6',
      name: 'Green Wonder',
      price: 70,
      description:
        "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
      imageUrl:
        'https://res.cloudinary.com/dlqnx5pot/image/upload/v1725143408/green-wonder_h9ggq2.png',
      type: 'rugged',
      hostId: '456',
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/vans', (schema, _request) => {
      return schema.vans.all();
    });

    this.get('/vans/:id', (schema, request) => {
      const vanId = request.params.id;
      return schema.vans.find(vanId);
    });

    this.get('/host/vans', (schema, _request) => {
      return schema.vans.where({ hostId: '123' });
    });

    this.get(`/host/vans/:id`, (schema, request) => {
      const vanId = request.params.id;
      return schema.vans.findBy({ hostId: '123', id: vanId });
    });

    this.post('/login', (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody);

      if (!(email && password)) {
        return new Response(401, {}, { message: 'Please enter all the details' });
      }

      let user = schema.users.findBy({ email });

      if (!user) {
        return new Response(401, {}, { message: 'Email not registered' });
      }

      if (password !== user.password) {
        return new Response(401, {}, { message: 'Incorrect password' });
      }

      user = user.attrs;
      user.password = undefined;

      return {
        message: 'User successfully logged in',
        user,
      };
    });

    this.post('/signup', (schema, request) => {
      const { name, email, password, confirmPassword } = JSON.parse(request.requestBody);

      if (!(name && email && password && confirmPassword)) {
        return new Response(401, {}, { message: 'Please enter all the details' });
      }

      if (password !== confirmPassword) {
        return new Response(
          401,
          {},
          {
            message: "Password and confirmed password don't match",
          }
        );
      }

      if (password.length < 6) {
        return new Response(401, {}, { message: 'Password must be atleast 6 characters long' });
      }

      let user = schema.users.findBy({ email });

      if (user) {
        return new Response(401, {}, { message: 'Email already registered' });
      }

      user = schema.users.create({ name, email, password });
      user = user.attrs;
      user.password = undefined;

      return {
        message: 'User successfully signed up',
        user,
      };
    });
  },
});
