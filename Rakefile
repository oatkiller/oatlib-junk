require 'rake'
require 'rake/packagetask'
require 'yaml'

task :default do
	desc "do it"
	require 'yaml'
	dest = ''
	yp = YAML::parse_documents(File.open('yaml')) { |tree|
		dest = tree.select('/dest')[0].value
	}
	load File.join('..','..','Rakefile')
	Rake::Task['build_plugins'].invoke('oatlib-ui/oatlib-ui')
	FileUtils.mv(File.join(LIBRARY_ROOT,'dist','oatlib.debug.js'),File.join(dest,'oatlib-ui.debug.js'))
	FileUtils.mv(File.join(LIBRARY_ROOT,'dist','oatlib.min.js'),File.join(dest,'oatlib-ui.min.js'))

end
