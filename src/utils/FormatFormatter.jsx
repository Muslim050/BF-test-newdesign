
import {Monitor, MonitorPlay, MonitorUp} from "lucide-react";

const formatMapping = {
  preroll: { icon: <Monitor />, label: 'Pre-roll' },
  mixroll: { icon: null, label: 'Mid-roll' },
  midroll1: { icon: null, label: 'Mid-roll 1' },
  midroll2: { icon: null, label: 'Mid-roll 2' },
  midroll3: { icon: null, label: 'Mid-roll 3' },
  midroll4: { icon: null, label: 'Mid-roll 4' },
  top_preroll: { icon: <MonitorUp />, label: 'Top Pre-roll' },
  tv_preroll: { icon: <MonitorPlay />, label: 'TV Pre-roll' },
};


export const FormatFormatter = ({ format }) => {
  const { icon, label } = formatMapping[format] || { icon: null, label: 'Unknown format' };
  return (
    <div className="flex items-center gap-1">
      {icon}
      {label}
    </div>
  )
}