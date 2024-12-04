// Requerir los módulos necesarios
const express = require('express');
const cors = require('cors');
const { MongoClient ,ObjectId  } = require('mongodb');

// Inicializar la aplicación de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Conectar a la base de datos de MongoDB
const mongoURI = 'mongodb+srv://ycastrov:Rqy5BlztGwt7oFam@cluster0.d1xzi.mongodb.net/?retryWrites=true&w=majority';

let db;
let usersCollection;
let worksCollection;

// Conectar al cliente MongoDB
MongoClient.connect(mongoURI,
 { autoSelectFamily: false,
 }
)
  .then(client => {
    console.log('Conectado a MongoDB');
    console.log(db)
    db = client.db('yoi');
    usersCollection = db.collection('usuarios');
    worksCollection = db.collection('trabajo');
    console.log(db)
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));


// ------Sesion-------------------------------------------------------------------------------------------
// Ruta para hacer login
app.post('/login',async(req,res)=>{
  const { correo, contrasena } = req.body;
  const usuario = await usersCollection.findOne({ correo });

  if (!usuario) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }
  if(usuario.correo == correo && usuario.contrasena == contrasena){
    return res.status(200).json({ message: 'Login Exitoso!',userData:usuario });
  }
  else{
    return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
  }
})
// ------Sesion-------------------------------------------------------------------------------------------



// ------Usuarios-----------------------------------------------------------------------------------------
// Ruta para crear un nuevo usuario
app.post('/registrarUsuario', async (req, res) => {
  const { nombre, contrasena,correo,telefono,rol } = req.body;
  try {
    const result = await usersCollection.insertOne({ nombre, contrasena,correo,telefono,rol });
    res.status(201).json({ _id: result.insertedId, nombre, correo });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario', details: err });
  }
});

// Ruta para obtener todos los usuarios
app.get('/todosUsuarios', async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los usuarios', details: err });
  }
});

// Ruta para obtener un usuario por ID
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el usuario', details: err });
  }
});

// Ruta para actualizar usuario
app.post('/actualizarUsuario', async (req, res) => {
  const { nombre, correo, contrasena,telefono,rol } = req.body;

  try {
    const filter = { correo: correo }; // Asegúrate de usar ObjectId si tu _id es de tipo ObjectId
    const update = {
      $set: { nombre, contrasena, correo,telefono, rol },
    };

    const result = await usersCollection.updateOne(filter, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario', details: err });
  }
});
// ------Usuarios-----------------------------------------------------------------------------------------



// ------Trabajos-----------------------------------------------------------------------------------------
// Ruta para obtener todos los trabajos
app.get('/todosTrabajos', async (req, res) => {
  try {
    const works = await worksCollection.find().toArray();
    res.status(200).json(works);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los trabajos', details: err });
  }
});
// Ruta para agregar un trabajo
app.post('/agregarTrabajo', async (req, res) => {
  const { 
    publishBy, 
    title, 
    company, 
    location, 
    city, 
    country, 
    type, 
    categoria, 
    salary, 
    habilidades, 
    responsabilidades, 
    experiencia, 
    url,
    requisitosEducativos, 
    descripcion 
  } = req.body;

  try {
    const nuevoTrabajo = {
      publishBy: new ObjectId(publishBy), 
      title, 
      company, 
      location, 
      city, 
      country, 
      type, 
      categoria, 
      salary, 
      url, 
      habilidades: {
        habilidad1: habilidades.habilidad1,
        habilidad2: habilidades.habilidad2,
        habilidad3: habilidades.habilidad3,
        habilidad4: habilidades.habilidad4,
      },
      responsabilidades: {
        responsabilidad1: responsabilidades.responsabilidad1,
        responsabilidad2: responsabilidades.responsabilidad2,
        responsabilidad3: responsabilidades.responsabilidad3,
      },
      experiencia: {
        experiencia1: experiencia.experiencia1,
      },
      requisitosEducativos: {
        requisitoEducativo1: requisitosEducativos.requisitoEducativo1,
      },
      descripcion,
      postulaciones: [],
    };

    const result = await worksCollection.insertOne(nuevoTrabajo);

    res.status(200).json({
      message: 'Trabajo agregado correctamente',
      trabajo: { _id: result.insertedId, ...nuevoTrabajo },
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el trabajo', details: err.message });
  }
});

// Ruta para agregar muchos trabajos
app.post('/agregarTrabajos', async (req, res) => {

  try {
    const jobListings = [
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Junior UI/UX Designer",
        company: "Company Name",
        location: "Heredia, Costa Rica",
        city:"San Rafael",
        country:"CR",
        type: "Hybrid",
        categoria:"diseno",
        salary: "$15,000",
        url: "job7.html",
        habilidades: {
          habilidad1: "Dominio de herramientas de diseño (ej., Sketch, Figma, Adobe XD).",
          habilidad2: "Fuerte comprensión de los principios de diseño centrado en el usuario.",
          habilidad3: "Excelentes habilidades de comunicación y colaboración.",
          habilidad4: "Inglés (B2 o C1)"
        },
        responsabilidades: {
          responsabilidad1: "Desarrollar interfaces y experiencias de usuario para aplicaciones web y móviles.",
          responsabilidad2: "Realizar investigaciones de usuarios y pruebas de usabilidad.",
          responsabilidad3: "Colaborar con gerentes de productos y desarrolladores."
        },
        experiencia: {
          experiencia1: "3+ años en diseño UI/UX o un campo relacionado."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Título universitario en Diseño, Interacción Humano-Computadora o campo relacionado."
        },
        descripcion: "Buscamos un Diseñador UI/UX y de Productos creativo y detallista para unirse a nuestro equipo dinámico. Desempeñarás un papel crucial en el diseño de interfaces amigables y en asegurar una experiencia de usuario excepcional en nuestros productos digitales."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Senior Front-End Developer",
        company: "Company Name",
        location: "San José, Costa Rica",
        city:"Desamparados",
        country:"CR",
        type: "Remote",
        categoria:"diseno",
        salary: "$25,000",
        url: "job8.html",
        habilidades: {
          habilidad1: "Dominio de JavaScript y frameworks como React.js y Angular.",
          habilidad2: "Experiencia en diseño responsivo y mobile-first.",
          habilidad3: "Conocimiento en metodologías ágiles (Scrum, Kanban).",
          habilidad4: "Inglés (C1)"
        },
        responsabilidades: {
          responsabilidad1: "Desarrollar y mantener aplicaciones web escalables y de alto rendimiento.",
          responsabilidad2: "Colaborar estrechamente con los equipos de diseño y back-end.",
          responsabilidad3: "Realizar pruebas de rendimiento y optimización de aplicaciones."
        },
        experiencia: {
          experiencia1: "5+ años en desarrollo front-end o campo relacionado."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Título universitario en Ciencias de la Computación o campo relacionado."
        },
        descripcion: "Buscamos un desarrollador front-end senior con amplia experiencia en el desarrollo de aplicaciones web interactivas. Serás responsable de construir experiencias de usuario ricas y eficientes que impulsen el éxito de nuestros productos."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Product Manager",
        company: "Company Name",
        location: "Alajuela, Costa Rica",
        city:"Carrizal",
        country:"CR",
        type: "Full-time",
        categoria:"administrativo",
        salary: "$18,000",
        url: "job9.html",
        habilidades: {
          habilidad1: "Experiencia en gestión de productos y liderazgo de equipos.",
          habilidad2: "Capacidad para realizar análisis de mercado y de usuarios.",
          habilidad3: "Conocimiento en metodologías ágiles y desarrollo de roadmaps.",
          habilidad4: "Inglés (B2 o C1)"
        },
        responsabilidades: {
          responsabilidad1: "Definir la visión y la estrategia del producto.",
          responsabilidad2: "Gestionar el ciclo de vida del producto desde la ideación hasta el lanzamiento.",
          responsabilidad3: "Colaborar con equipos multifuncionales para impulsar la entrega exitosa del producto."
        },
        experiencia: {
          experiencia1: "3+ años de experiencia en gestión de productos o un campo relacionado."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Título universitario en Administración de Empresas, Ingeniería o un campo relacionado."
        },
        descripcion: "Estamos buscando un Product Manager con pasión por la tecnología y la innovación. El candidato ideal será un líder con visión estratégica y habilidades para llevar productos desde la idea hasta su lanzamiento exitoso."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Data Analyst",
        company: "Company Name",
        location: "Heredia, Costa Rica",
        city:"San Joaquin",
        country:"CR",
        type: "Full-time",
        categoria:"developer",
        salary: "$12,000",
        url: "job10.html",
        habilidades: {
          habilidad1: "Dominio de herramientas de análisis de datos como SQL, Excel y Python.",
          habilidad2: "Conocimiento en estadística y análisis de tendencias.",
          habilidad3: "Capacidad para trabajar con grandes volúmenes de datos.",
          habilidad4: "Inglés (B2)"
        },
        responsabilidades: {
          responsabilidad1: "Analizar grandes volúmenes de datos para encontrar patrones y tendencias.",
          responsabilidad2: "Generar informes y presentaciones para los equipos de negocio.",
          responsabilidad3: "Colaborar con otros departamentos para optimizar el uso de datos."
        },
        experiencia: {
          experiencia1: "2+ años de experiencia como analista de datos o en un campo relacionado."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Licenciatura en Estadística, Matemáticas, Ciencias de la Computación o un campo relacionado."
        },
        descripcion: "Buscamos un analista de datos con habilidades excepcionales para transformar datos crudos en información valiosa y que pueda apoyar a nuestros equipos a tomar decisiones estratégicas basadas en datos."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Back-End Developer",
        company: "Company Name",
        location: "San José, Costa Rica",
        city:"Pavas",
        country:"CR",
        type: "Remote",
        categoria:"developer",
        salary: "$20,000",
        url: "job11.html",
        habilidades: {
          habilidad1: "Dominio de lenguajes de programación como Python, Java o Ruby.",
          habilidad2: "Experiencia con bases de datos SQL y NoSQL.",
          habilidad3: "Familiaridad con arquitectura de microservicios.",
          habilidad4: "Inglés (B2)"
        },
        responsabilidades: {
          responsabilidad1: "Desarrollar y mantener servicios y APIs back-end.",
          responsabilidad2: "Optimizar el rendimiento del servidor y la base de datos.",
          responsabilidad3: "Colaborar con equipos de desarrollo front-end."
        },
        experiencia: {
          experiencia1: "4+ años en desarrollo back-end o en un campo relacionado."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Licenciatura en Ciencias de la Computación o un campo relacionado."
        },
        descripcion: "Estamos buscando un desarrollador back-end experimentado que tenga una profunda comprensión de las tecnologías de servidores, bases de datos y servicios web."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "DevOps Engineer",
        company: "Company Name",
        location: "Alajuela, Costa Rica",
        city:"La Agonia",
        country:"CR",
        type: "Full-time",
        categoria:"developer",
        salary: "$22,000",
        url: "job12.html",
        habilidades: {
          habilidad1: "Dominio de herramientas de automatización como Docker, Jenkins y Kubernetes.",
          habilidad2: "Experiencia con cloud computing (AWS, Azure, GCP).",
          habilidad3: "Capacidad para manejar infraestructura como código.",
          habilidad4: "Inglés (B2)"
        },
        responsabilidades: {
          responsabilidad1: "Gestionar la infraestructura de la nube y los pipelines de CI/CD.",
          responsabilidad2: "Automatizar tareas repetitivas y optimizar el flujo de trabajo.",
          responsabilidad3: "Colaborar con equipos de desarrollo para mejorar la eficiencia."
        },
        experiencia: {
          experiencia1: "3+ años de experiencia en DevOps o un campo relacionado."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Licenciatura en Ciencias de la Computación, Ingeniería de Sistemas o campo relacionado."
        },
        descripcion: "Estamos buscando un ingeniero DevOps que pueda administrar nuestra infraestructura y mejorar la entrega de software mediante la automatización de tareas y la optimización de nuestros procesos."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Mobile App Developer",
        company: "Company Name",
        location: "San José, Costa Rica",
        city:"Zapote",
        country:"CR",
        type: "Hybrid",
        categoria:"developer",
        salary: "$18,500",
        url: "job13.html",
        habilidades: {
          habilidad1: "Experiencia con desarrollo móvil en plataformas Android e iOS.",
          habilidad2: "Conocimiento en frameworks como React Native o Flutter.",
          habilidad3: "Capacidad para escribir código limpio y bien documentado.",
          habilidad4: "Inglés (B2)"
        },
        responsabilidades: {
          responsabilidad1: "Desarrollar aplicaciones móviles de alto rendimiento.",
          responsabilidad2: "Optimizar el rendimiento de las aplicaciones móviles.",
          responsabilidad3: "Colaborar con los equipos de diseño y back-end."
        },
        experiencia: {
          experiencia1: "2+ años de experiencia en desarrollo de aplicaciones móviles."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Licenciatura en Ingeniería en Sistemas, Informática o un campo relacionado."
        },
        descripcion: "Buscamos un desarrollador de aplicaciones móviles con experiencia que pueda crear aplicaciones móviles innovadoras y de alto rendimiento."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Content Writer",
        company: "Company Name",
        location: "Heredia, Costa Rica",
        city:"Barva",
        country:"CR",
        type: "Remote",
        categoria:"marketing",
        salary: "$10,000",
        url: "job14.html",
        habilidades: {
          habilidad1: "Habilidades excepcionales de escritura y edición.",
          habilidad2: "Experiencia en redacción de contenido digital y blogs.",
          habilidad3: "Conocimiento en SEO y marketing de contenido.",
          habilidad4: "Inglés (C1)"
        },
        responsabilidades: {
          responsabilidad1: "Crear contenido atractivo y de alta calidad para nuestros canales digitales.",
          responsabilidad2: "Investigar y escribir artículos relacionados con la industria.",
          responsabilidad3: "Optimizar el contenido para motores de búsqueda (SEO)."
        },
        experiencia: {
          experiencia1: "1+ años de experiencia como redactor de contenido."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Licenciatura en Comunicación, Marketing, o un campo relacionado."
        },
        descripcion: "Estamos buscando un redactor de contenido creativo y detallista que pueda crear artículos interesantes y optimizados para SEO que atraigan y eduquen a nuestra audiencia."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Software Engineer",
        company: "Company Name",
        location: "San José, Costa Rica",
        city:"Zapote",
        country:"CR",
        type: "Full-time",
        categoria:"developer",
        salary: "$24,000",
        url: "job15.html",
        habilidades: {
          habilidad1: "Dominio de lenguajes de programación como Java, C++, Python.",
          habilidad2: "Experiencia con pruebas de software y aseguramiento de calidad.",
          habilidad3: "Capacidad para trabajar en equipo en un entorno ágil.",
          habilidad4: "Inglés (C1)"
        },
        responsabilidades: {
          responsabilidad1: "Desarrollar software y aplicaciones de alto rendimiento.",
          responsabilidad2: "Realizar pruebas de calidad y depuración.",
          responsabilidad3: "Colaborar con equipos de producto y diseño para mejorar el software."
        },
        experiencia: {
          experiencia1: "4+ años de experiencia en desarrollo de software."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Licenciatura en Ciencias de la Computación o un campo relacionado."
        },
        descripcion: "Buscamos un ingeniero de software altamente competente que pueda desarrollar aplicaciones y software de alto rendimiento. Trabajarás en un equipo ágil para ofrecer soluciones innovadoras."
      },
      {
        publishBy: new ObjectId("674d17b3963da43d0853b884"),
        title: "Cloud Architect",
        company: "Company Name",
        location: "San José, Costa Rica",
        city:"Uruca",
        country:"CR",
        type: "Remote",
        categoria:"developer",
        salary: "$30,000",
        url: "job16.html",
        habilidades: {
          habilidad1: "Experiencia con plataformas de nube como AWS, Azure o GCP.",
          habilidad2: "Conocimiento en arquitectura de microservicios y contenedores.",
          habilidad3: "Capacidad para diseñar soluciones escalables y seguras.",
          habilidad4: "Inglés (C1)"
        },
        responsabilidades: {
          responsabilidad1: "Diseñar arquitecturas de nube escalables y seguras.",
          responsabilidad2: "Gestionar la implementación de soluciones en la nube.",
          responsabilidad3: "Colaborar con equipos técnicos para optimizar el uso de la nube."
        },
        experiencia: {
          experiencia1: "5+ años de experiencia en arquitectura de la nube."
        },
        requisitosEducativos: {
          requisitoEducativo1: "Licenciatura en Ciencias de la Computación o campo relacionado."
        },
        descripcion: "Buscamos un arquitecto de nube con experiencia para diseñar y gestionar soluciones en la nube escalables, seguras y eficientes. Este puesto implica trabajar con equipos de desarrollo y operaciones para optimizar nuestros sistemas en la nube."
      }
    ];

    const result = await worksCollection.insertMany(jobListings);

    res.status(200).json({
      message: 'Trabajos agregado correctamente',
      trabajo: { _id: result.insertedId, ...jobListings },
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el trabajo', details: err });
  }
}); 

// Ruta para obtener trabajo por id
app.post('/trabajo', async (req, res) => {
  const { id } = req.body; // Extraer el ID de los parámetros de la URL

  try {
    const trabajo = await worksCollection.findOne({ _id: new ObjectId(id) });

    if (!trabajo) {
      return res.status(404).json({ error: 'Trabajo no encontrado' });
    }

    res.status(200).json(trabajo);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el trabajo', details: err });
  }
});

app.get('/trabajosPorPublicador/:publishBy', async (req, res) => {
  const { publishBy } = req.params;

  try {
    const trabajos = await worksCollection
      .find({ publishBy: new ObjectId(publishBy) }) // Buscar por publishBy
      .toArray();

    if (trabajos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron trabajos para este publicador.' });
    }

    res.status(200).json(trabajos);
  } catch (err) {
    console.error('Error al obtener trabajos:', err);
    res.status(500).json({ error: 'Error al obtener trabajos', details: err.message });
  }
});

// Ruta para eliminar trabajo por ID
app.delete('/eliminarTrabajo/:id', async (req, res) => {
  const { id } = req.params; // Obtén el ID del parámetro de la URL

  try {
    // Convertir el ID a ObjectId
    const objectId = new ObjectId(id);

    // Elimina el trabajo que coincida con el _id
    const result = await worksCollection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'Trabajo eliminado correctamente',
      });
    } else {
      res.status(404).json({
        message: 'No se encontró ningún trabajo con el ID especificado',
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el trabajo', details: err });
  }
});

app.post('/editarTrabajo', async (req, res) => {
  const { id, updatedData } = req.body; // Obtén el ID del parámetro de la URL
  // Los nuevos datos para el trabajo

  try {
    console.log(updatedData)
    const objectId = new ObjectId(id);
    // Actualiza el trabajo con el nuevo contenido
    const result = await worksCollection.updateOne(
      { _id: objectId}, // Filtro por _id
      { $set: updatedData } // Nuevos datos
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: 'Trabajo editado correctamente',
      });
    } else {
      res.status(404).json({
        message: 'No se encontró ningún trabajo con el ID especificado o no se hicieron cambios',
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al editar el trabajo', details: err });
  }
});

// Ruta para obtener trabajo por ID
app.get('/trabajo/:id', async (req, res) => {
  const { id } = req.params; // Obtén el ID del parámetro de la URL

  try {
    // Convertir el ID a ObjectId
    const objectId = new ObjectId(id);

    // Buscar el trabajo en la colección
    const trabajo = await worksCollection.findOne({ _id: objectId });

    if (trabajo) {
      res.status(200).json(trabajo); // Si se encuentra el trabajo, lo devuelve
    } else {
      res.status(404).json({
        message: 'No se encontró ningún trabajo con el ID especificado', // Si no se encuentra el trabajo
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el trabajo', details: err }); // Error en la consulta
  }
});


// Ruta para agregar una postulacion a un trabajo
app.post('/agregarPostulacion', async (req, res) => {
  const { idPostulacion, nombre,correo,telefono,cv,mensaje  } = req.body;
  try {
    let nuevoPostulante = {nombre,correo,telefono,cv,mensaje}
    const result = await worksCollection.updateOne(
      { "_id": new ObjectId(idPostulacion) }, // Buscar por _id
      { $push: { "postulaciones": nuevoPostulante} } // Agregar el objeto al array 'postulaciones'
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Documento no encontrado o no se actualizó.' });
    }
    res.status(200).json({ message: 'Postulacion agregada con éxito.', result: result });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar postulante', details: err.message });
  }
});

app.get('/postulacionesPorCorreo/:correo', async (req, res) => {
  const { correo } = req.params;

  try {
    // Busca documentos donde el correo esté dentro del array `postulaciones`
    const trabajos = await worksCollection.find({
      postulaciones: { $elemMatch: { correo } },
    }).toArray();

    res.status(200).json(trabajos);
  } catch (err) {
    res.status(500).json({
      error: 'Error al obtener los trabajos',
      details: err.message,
    });
  }
});
// ------Trabajos-----------------------------------------------------------------------------------------

// Puerto de escucha
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
