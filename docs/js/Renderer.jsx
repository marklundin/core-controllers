var React = require( 'react' )
var PropTypes = React.PropTypes

const s = require('react-styleguidist/src/rsg-components/ReactComponent/ReactComponent.css');

const Renderer = ({ name, pathLine, description, propList, examples }) => {
	return (
		<div className={s.root}>
			<header className={s.header}>
				<h2 className={s.heading} id={name}>
					<a className={s.anchor} href={'#' + name}></a>
					{name}
				</h2>
				<div className={s.pathLine}>{pathLine}</div>
			</header>
			<div>
				{description}
			</div>
            {examples}
			{propList}
		</div>
	);
};

Renderer.propTypes = {
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.object,
	propList: PropTypes.object,
	examples: PropTypes.array
};


export default Renderer;
