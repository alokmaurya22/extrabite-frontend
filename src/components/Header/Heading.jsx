import { useEffect, useState } from "react";
import "./Heading.css"; // Ensure to include the CSS file
import { getStatisticsSummary } from '../../util/api';

function Heading() {
    const [statsText, setStatsText] = useState('Loading impactful stats...');

    useEffect(() => {
        async function fetchStats() {
            try {
                // Fetch both India and Global stats for the latest year (2024)
                const [india, global] = await Promise.all([
                    getStatisticsSummary({ region: 'India', year: 2024 }),
                    getStatisticsSummary({ region: 'Global', year: 2024 })
                ]);
                const text = `
🌍 <b>Global Crisis:</b> Approximately
<span style='color:#E74C3C;font-weight:bold;'>${global.hunger}M</span> individuals battling hunger • 
<span style='color:#FF7401;font-weight:bold;'>${global.foodWaste}M</span> tonnes of food surplus wasted 
| 
🇮🇳 <b>India's Reality: </b> Approximately
<span style='color:#E74C3C;font-weight:bold;'>${india.hunger}M</span> citizens malnourished • 
<span style='color:#FF7401;font-weight:bold;'>${india.foodWaste}M</span> tonnes of resources untapped 
| 
<span style='color:#2ECC71;font-weight:bold;'>Your Impact Matters: Approximately 
<span style='color:#2ECC71;'>${india.peopleFed.toLocaleString()}</span> lives can be transformed daily!</span> 
✨ 
<span style='color:#FF7401;font-weight:bold;'>Join Extra Bite - Empower Change, Transform Lives</span>
`;
                setStatsText(text);
            } catch {
                setStatsText('Unable to load stats. Please try again later.');
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="bg-[#D7DAF5] p-2 border-t border-black w-full overflow-hidden flex items-center">
            <div className="font-bold text-orange-600 text-lg md:text-2xl flex-shrink-0 mr-4">
                Facts & Stats
            </div>
            <div className="marquee-container">
                <div className="marquee-content text-black text-sm md:text-lg" dangerouslySetInnerHTML={{ __html: statsText }} />
            </div>
        </div>
    );
}

export default Heading;