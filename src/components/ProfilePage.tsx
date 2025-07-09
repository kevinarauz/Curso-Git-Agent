import React from 'react';
import { 
  User, 
  Code, 
  Database, 
  Server, 
  Shield, 
  GitBranch, 
  Award, 
  Briefcase, 
  Mail, 
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle,
  Star
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const technologies = [
    { category: 'Frontend', items: ['HTML5', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', '.NET Frontend', 'PHP Frontend', 'Java Frontend', 'Python Frontend'] },
    { category: 'Backend', items: ['Java EE', '.NET', 'PHP', 'Node.js', 'Python', 'Spring Boot', 'JSF', 'JSP'] },
    { category: 'Bases de Datos', items: ['Oracle PL/SQL', 'MySQL', 'SQL Server', 'PostgreSQL', 'MongoDB'] },
    { category: 'DevOps & Cloud', items: ['Docker', 'OpenShift', 'Jenkins', 'Azure DevOps Server (TFS)', 'Azure', 'CI/CD'] },
    { category: 'Calidad & Seguridad', items: ['SonarQube', 'Veracode', 'OAuth2', 'OpenID Connect', 'Keycloak'] },
    { category: 'Herramientas', items: ['Git', 'GitHub', 'GitLab', 'Postman', 'SOAP-UI', 'Swagger', 'Visual Studio', 'IntelliJ IDEA', 'PyCharm'] },
    { category: 'Metodologías', items: ['Scrum', 'APIs RESTful', 'Microservicios', 'Patrones MVC', 'Repository Pattern', 'Clean Code'] }
  ];

  const achievements = [
    "Microservicios y APIs RESTful con Spring Boot",
    "Backend Multilenguaje (Java, .NET, PHP, Node.js, Python)",
    "Modelado y optimización de bases de datos",
    "Orquestación con Docker y OpenShift",
    "Pipelines CI/CD con Jenkins y Azure DevOps",
    "Integración de herramientas de calidad y seguridad"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">Kevin Arauz</h1>
              <h2 className="text-xl font-semibold text-blue-100 mb-4">Desarrollador Full Stack</h2>
              <p className="text-lg text-blue-50 max-w-3xl">
                Más de 5 años de experiencia, dedicado a crear soluciones digitales escalables y de alto rendimiento que impulsan el éxito de las empresas.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>5+ años de experiencia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Desarrollador Full Stack</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Me especializo en transformar requisitos de negocio en arquitecturas robustas y mantenibles, 
                aplicando principios de Clean Code y programación funcional. Trabajo de forma ágil, 
                colaborativa y orientada a resultados para garantizar entregas a tiempo y de alta calidad.
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-blue-600" />
                Experiencia Destacada
              </h3>
              <div className="grid gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-blue-600" />
                Tecnologías y Herramientas
              </h3>
              <div className="grid gap-6">
                {technologies.map((tech, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      {tech.category === 'Frontend' && <Code className="w-4 h-4 mr-2 text-orange-600" />}
                      {tech.category === 'Backend' && <Server className="w-4 h-4 mr-2 text-green-600" />}
                      {tech.category === 'Bases de Datos' && <Database className="w-4 h-4 mr-2 text-blue-600" />}
                      {tech.category === 'DevOps & Cloud' && <GitBranch className="w-4 h-4 mr-2 text-purple-600" />}
                      {tech.category === 'Calidad & Seguridad' && <Shield className="w-4 h-4 mr-2 text-red-600" />}
                      {tech.category === 'Herramientas' && <ExternalLink className="w-4 h-4 mr-2 text-indigo-600" />}
                      {tech.category === 'Metodologías' && <Star className="w-4 h-4 mr-2 text-yellow-600" />}
                      {tech.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.items.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Información de Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href="mailto:kevin.arauz@email.com" className="text-blue-600 hover:text-blue-800">
                    kevin.arauz@email.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <GitBranch className="w-5 h-5 text-gray-400" />
                  <div className="flex space-x-2">
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">GitHub</a>
                    <span className="text-gray-400">•</span>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">LinkedIn</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Disponible para trabajo remoto</span>
                </div>
              </div>
            </div>

            {/* Skills Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Especialidades Clave</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Desarrollo Full Stack</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Microservicios</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">DevOps & CI/CD</span>
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Bases de Datos</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Seguridad</span>
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Patterns */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Patrones y Arquitecturas</h3>
              <div className="space-y-2">
                <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm">
                  📐 Patrones MVC
                </div>
                <div className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm">
                  🏗️ Repository Pattern
                </div>
                <div className="bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-sm">
                  🔄 Microservicios
                </div>
                <div className="bg-orange-50 text-orange-800 px-3 py-2 rounded-lg text-sm">
                  🏢 Arquitecturas Monolíticas
                </div>
                <div className="bg-red-50 text-red-800 px-3 py-2 rounded-lg text-sm">
                  🔐 Seguridad OAuth2/OIDC
                </div>
              </div>
            </div>

            {/* Git Training Portal Link */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-2">🚀 Proyecto Destacado</h3>
              <h4 className="font-semibold mb-2">Portal de Capacitación Git</h4>
              <p className="text-blue-100 text-sm mb-4">
                Portal interactivo de aprendizaje con IA integrada para enseñar Git, GitLab y GitHub
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-blue-100 text-sm">
                  <Code className="w-4 h-4" />
                  <span>React + TypeScript + Vite</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-100 text-sm">
                  <GitBranch className="w-4 h-4" />
                  <span>Integración con Gemini AI</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-100 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Sistema de gamificación</span>
                </div>
              </div>
            </div>

            {/* Additional Projects */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Otros Proyectos</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">API Gateway Microservicios</h4>
                  <p className="text-gray-600 text-sm">Spring Boot + OAuth2 + Docker</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Sistema ERP Empresarial</h4>
                  <p className="text-gray-600 text-sm">.NET + SQL Server + Azure DevOps</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Dashboard Analytics</h4>
                  <p className="text-gray-600 text-sm">Python + MongoDB + CI/CD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
