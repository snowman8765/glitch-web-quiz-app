const React = require('react');

const User = function() {
  return (
    <div>
      <h1>Hello World!</h1>

      <p>This is a starter <a href="http://glitch.com">Glitch</a> app for React! It uses 
        only a few dependencies to get you started on working with React:</p>

      <UnorderedList items={dependenciesArray} />

      <p>Look in <code>app/components/</code> for two example components:</p>

      <UnorderedList items={componentsMade} />
    </div>
  );
}

module.exports = HelloWorld;