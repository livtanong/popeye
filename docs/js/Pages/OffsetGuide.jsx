import React from "react";
import {PrismCode} from "react-prism";
import Popeye from "../../../src/js/Popeye";

export default class OffsetGuide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popover1: false,
			popover2: false
		}
	}
	render() {
		const demoString1 = 
`<a key="anchor1" className="button button-main" onClick={ Popeye.toggleHandler(this, "popover1") }>
	click me
	<Popeye
		anchorOffset={ {left: 0, bottom: -16} }
		opened={ this.state.popover1 } 
		onToggle={ Popeye.toggleHandler(this, "popover1") }>
		<div className="dropdown">
			Aye aye, Captain!
		</div>
	</Popeye>
</a>`;

		const demoString2 =
`<a key="anchor2" className="button button-main" onClick={ Popeye.toggleHandler(this, "popover2") }>
	click me 2
	<Popeye
		popOffset={ {left: 0, top: -16} }
		opened={ this.state.popover2 } 
		onToggle={ Popeye.toggleHandler(this, "popover2") }>
		<div className="dropdown">
			Aye aye, Captain!
		</div>
	</Popeye>
</a>`;

	const demoString3 = 
`<a key="anchor2" className="button button-main" onClick={ Popeye.toggleHandler(this, "popover2") }>
	click me 3
	<Popeye
		anchorOffset={ {left: 45, top: 16} }
		popOffset={ {left: 45, top: 16} }
		opened={ this.state.popover2 } 
		onToggle={ Popeye.toggleHandler(this, "popover2") }>
		<div className="dropdown">
			Aye aye, Captain!
		</div>
	</Popeye>
</a>`;

		return (
			<article>
				<section>
					<h1>Offsets</h1>
					<h2>Anchor Offset</h2>
					<p>Sometimes, we want to move the point on the anchor element that <code>Popeye</code> is anchored to.</p>
					<p>We take the same example as in the Basic Usage guide, then add some extra props.</p>
					<div className="example">
						<a key="anchor1" className="button button-main" onClick={ Popeye.toggleHandler(this, "popover1") }>
							click me
							<Popeye
								anchorOffset={ {left: 0, bottom: -16} }
								opened={ this.state.popover1 } 
								onToggle={ Popeye.toggleHandler(this, "popover1") }>
								<div className="dropdown">
									Aye aye, Captain!
								</div>
							</Popeye>
						</a>
					</div>
					<PrismCode className="code-block language-jsx">
						{ demoString1 }
					</PrismCode>
					<p>
						Our coordinate system is similar to html/css absolute and relative positioning. We use <code>top</code>, <code>bottom</code>, <code>left</code>, and <code>right</code>, but only one of each axis at a time. For example, we can use <code>top</code> and <code>left</code>, but never <code>top</code> and <code>bottom</code>.
					</p>
					<p>
						Each side-value pair describes a point on the anchor relative to the side. <code>{"{left: 7, bottom: 13}"}</code> would have described a point fully inside the boundaries of the <code>{"<a>"}</code>.
					</p>
					<p>
						As it is, the side-value pair is <code>{"{left: 0, bottom: -16}"}</code>. The point is therefore outside the boundaries of the <code>{"<a>"}</code>, exactly 16 pixels below it.
					</p>
				</section>
				<section>
					<h2>Pop Offset</h2>
					<p>... And sometimes, we want to move the point on <code>Popeye</code> that the anchor point is attached to.</p>
					<p>This has the same effect as the example above illustrating anchor offsetting, except for one difference: the origin of the animation. In the previous example, the <code>Popeye</code> appeared to have come a point on its upper-left. In this example, the origin appeared to have come from the <em>lower</em> left of the <strong>anchor</strong>.</p>
					<div className="example">
						<a key="anchor2" className="button button-main" onClick={ Popeye.toggleHandler(this, "popover2") }>
							click me 2
							<Popeye
								popOffset={ {left: 0, top: -16} }
								opened={ this.state.popover2 } 
								onToggle={ Popeye.toggleHandler(this, "popover2") }>
								<div className="dropdown">
									Aye aye, Captain!
								</div>
							</Popeye>
						</a>
					</div>
					<PrismCode className="code-block language-jsx">
						{ demoString2 }
					</PrismCode>
				</section>
				<section>
					<h2>Altogether Now</h2>
					<p>Now we apply the two to mimic Google's Material Design guidelines on popovers.</p>
					<p>The MDG advises us to make the popover <em>cover</em> the button from which it emanates.</p>
					<p>Both <code>anchorOffset</code> and <code>popOffset</code> have the same value because we would like them both to be aligned to the top-left. The numerical values we assign them only control the origin of the animation—the center point of the anchor.</p>
					<div className="example">
						<a key="anchor2" className="button button-main" onClick={ Popeye.toggleHandler(this, "popover3") }>
							click me 3
							<Popeye
								anchorOffset={ {left: 45, top: 16} }
								popOffset={ {left: 45, top: 16} }
								opened={ this.state.popover3 } 
								onToggle={ Popeye.toggleHandler(this, "popover3") }>
								<div className="dropdown">
									Aye aye, Captain!
								</div>
							</Popeye>
						</a>
					</div>
					<PrismCode className="code-block language-jsx">
						{ demoString3 }
					</PrismCode>
				</section>
			</article>
		)
	}
}