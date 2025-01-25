import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Configuración de la Aplicación de Reportes de Seguridad Móvil</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="appName" className="block text-sm font-medium text-gray-700">Nombre de la Aplicación:</label>
          <input type="text" id="appName" name="appName" className="mt-1 block w-full border border-gray-300 rounded-sm-md shadow-sm-xs focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Tema de la Aplicación:</label>
          <select id="theme" name="theme" className="mt-1 block w-full border border-gray-300 rounded-sm-md shadow-sm-xs focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Idioma:</label>
          <select id="language" name="language" className="mt-1 block w-full border border-gray-300 rounded-sm-md shadow-sm-xs focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-700">Notificaciones:</label>
          <input type="checkbox" id="notifications" name="notifications" className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded-sm focus:ring-indigo-500" />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm-xs text-sm font-medium rounded-sm-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Guardar Configuración</button>
      </form>
    </div>
  );
};

export default SettingsPage;