import React from 'react';

const FILL_DEFAULT = '#727272';

class SeatIcon extends React.Component {

    render() {
        let { className, fill } = this.props;
        fill = fill !== undefined ? fill : FILL_DEFAULT;

        return (
            <div className={ className }>
                <svg viewBox="0 0 512 512">
                    <g>
                        <path fill={ fill } d="M450.08,360.192c-9.237-8.683-19.84-12.907-29.163-15.211c1.749-7.488,3.264-15.467,4.459-23.915    c2.091-14.528,1.557-29.333-1.6-44.053l-26.965-126.272c-4.608-16.299-14.315-28.437-26.432-37.675    c0.491-0.619,1.131-1.109,1.6-1.771c6.891-9.899,8.832-22.421,5.355-33.899l-8.021-48c-0.213-1.323-0.555-2.624-1.024-3.883    C362.635,10.24,347.957,0,331.744,0H180.235c-16.213,0-30.891,10.24-37.141,27.413l-12.629,47.68    c-4.48,12.096-2.773,25.6,4.587,36.181c1.152,1.643,2.581,2.987,3.947,4.395c-11.051,9.173-19.883,20.949-24.235,36.437    L88.117,277.013c-3.136,14.635-3.669,29.44-1.6,44.075c1.216,8.448,2.709,16.405,4.48,23.893    c-9.301,2.325-19.883,6.549-29.099,15.211c-8.789,8.235-19.243,23.424-19.221,49.899C44.405,445.355,71.157,512,159.989,512h192    c88.832,0,115.584-66.645,117.333-102.933C469.323,383.616,458.869,368.427,450.08,360.192z M138.656,467.285    c-48.64-10.005-52.992-53.739-53.333-58.219c0-12.224,4.267-16.32,5.675-17.664c3.051-2.923,7.339-4.587,11.243-5.461    c5.845,9.237,12.587,16.768,20.096,22.485c0.299,0.277,0.619,0.469,0.896,0.747c1.621,1.536,3.285,2.88,4.971,4.224    c1.707,1.323,3.456,2.517,5.248,3.648c1.728,1.109,3.392,2.304,5.205,3.221V467.285z M330.656,469.333H181.323v-46.891    c1.856-0.619,3.947-1.28,6.379-1.984c0.512-0.149,1.109-0.32,1.643-0.469c2.24-0.64,4.715-1.323,7.339-1.984    c0.96-0.256,1.941-0.512,2.965-0.747c2.944-0.725,6.08-1.429,9.408-2.112c0.619-0.128,1.195-0.277,1.835-0.405    c3.904-0.768,8.043-1.472,12.331-2.112c1.152-0.171,2.325-0.32,3.499-0.469c3.371-0.448,6.869-0.832,10.411-1.152    c1.387-0.128,2.752-0.256,4.139-0.341c4.8-0.341,9.685-0.597,14.677-0.597c4.949,0,9.813,0.256,14.571,0.597    c1.408,0.085,2.773,0.213,4.16,0.341c3.541,0.32,6.997,0.704,10.368,1.152c1.173,0.149,2.368,0.299,3.499,0.469    c4.288,0.64,8.448,1.344,12.352,2.133c0.597,0.107,1.131,0.235,1.707,0.363c3.349,0.683,6.549,1.408,9.536,2.133    c1.024,0.256,2.027,0.512,3.029,0.768c2.56,0.64,4.971,1.301,7.168,1.92c0.597,0.192,1.301,0.363,1.877,0.533    c2.453,0.725,4.587,1.408,6.443,2.005V469.333z M270.112,85.333c-3.264-0.064-5.995-0.043-8.171,0h-11.691    c-1.344-0.021-2.795-0.021-4.416,0h-74.027l11.285-42.667h145.195l7.125,42.667H270.112z M373.323,467.285v-47.04    c1.813-0.917,3.499-2.155,5.227-3.243c1.685-1.088,3.328-2.219,4.949-3.456c1.728-1.365,3.456-2.709,5.099-4.288    c0.171-0.149,0.363-0.277,0.533-0.427c7.744-5.76,14.635-13.419,20.608-22.891c3.755,0.853,8,2.411,11.136,5.355    c1.429,1.344,5.781,5.44,5.824,16.555C426.315,413.419,421.963,457.259,373.323,467.285z" />
                    </g>
                </svg>
            </div>
        )
    }
}

export default SeatIcon;
