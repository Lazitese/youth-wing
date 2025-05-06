  {/* Section 3 - Program */}
  <div className="bg-white rounded-lg shadow-md p-8 mb-12">
    <h2 className="text-2xl font-bold text-gov-dark mb-8 text-center">
      የብልፅግና ፓርቲ <span className="text-gov-accent">ፕሮግራም</span>
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map((program, index) => (
        <div key={index} className="bg-gradient-to-b from-white to-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-lg">የፕሮግራም ምስል</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gov-dark mb-3">{program.title}</h3>
            <p className="text-gray-600 mb-4">{program.description}</p>
            <div className="flex flex-wrap gap-2">
              {program.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gov-accent/10 text-gov-accent px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  {/* Section 4 - Projects */}
  <div className="bg-white rounded-lg shadow-md p-8 mb-12">
    <h2 className="text-2xl font-bold text-gov-dark mb-8 text-center">
      የተጠናቀቁ <span className="text-gov-accent">ፕሮጀክቶች</span>
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div key={index} className="group relative bg-gradient-to-b from-white to-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-lg">የፕሮጀክት ምስል</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gov-accent/10 text-gov-accent px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
              <h3 className="text-xl font-bold text-gov-dark group-hover:text-gov-accent transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div> 