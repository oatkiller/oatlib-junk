require 'rake'
require 'rake/packagetask'
require 'yaml'

UI_ROOT = File.expand_path(File.dirname(__FILE__))
require 'yaml'
dest = ''
yp = YAML::parse_documents(File.open('yaml')) { |tree|
	dest = tree.select('/dest')[0].value
}
load File.join('..','..','Rakefile')

task :default do
	desc "do it"
	Rake::Task['build_plugins'].invoke('oatlib-ui/oatlib-ui')
	FileUtils.mv(File.join(LIBRARY_ROOT,'dist','oatlib.debug.js'),File.join(dest,'oatlib-ui.debug.js'))
	FileUtils.mv(File.join(LIBRARY_ROOT,'dist','oatlib.min.js'),File.join(dest,'oatlib-ui.min.js'))
end

task :all_tests do
	cd File.join(UI_ROOT)
	modules = 	Dir['**/units.js'].map {|x| 'oatlib-ui/' + x.sub(/\.js$/,' ') }.join
	puts modules
	Rake::Task['build_plugins'].invoke(modules)
	FileUtils.mv(File.join(LIBRARY_ROOT,'dist','oatlib.debug.js'),File.join(dest,'oatlib-ui.debug.js'))
	FileUtils.mv(File.join(LIBRARY_ROOT,'dist','oatlib.min.js'),File.join(dest,'oatlib-ui.min.js'))
end
