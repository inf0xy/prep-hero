import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type ResourcesIconProps = {
  width?: number;
  height?: number;
};

const ResourcesIcon: React.FC<ResourcesIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB20lEQVR4nO2YvW7UQBSFTZEI2qQE3oNFKfMGeQw6pFBGUCxvQEEFRZq8QbbfIpQp0kTbZlGAFfecK+/yp9xotI7jLPL+2DOON5ojjSx5NNfz+VwfW06SqKiohyszewLoO0IHEP4j1KqMbO0A0LeuZnObF+1X3XQ5jPbN7HFwAEzvvAUZwoPgAIQO8rsG7JvZRtVabi3JN7cAep6EFgo9b2abdeu5GhBOspqahBYLlvuqCWjXbd4dk3UEaFSsAOB6HdDXAE8h/LNCzH4lueNqAOhAOMzO/ybYG4/Gz70BAPq+0Mv+4hX6Mav/4f959rwAmNkj18P+3w0cFhx4AeHFzPwvnw50FzlQN3a9PIerLvYdu40DhEgtRgBEB5JlYxfCyewb+t5bqELsaqsAlo1dttWBumIEQHSglhhbCPmDOSqLPRV91XoHODf+9GydAbS1DkB4Vfi+7wS9WCAHUAB4uXYAAI8WtM8XANutBUjT9ClEv8+F+Mm91gLkEFMn8nbKh+hJmQNzYrfySELL94YZAQLH7jJiwy20Uuy2DgCLY7fsU+Sbiu7mmxZ+hvBv7T9zQWK3dPDQ1RCRrZL54+AAC2O31AFe3nVAP904kP2dPk5/pM8aAYiKikoa1zWi0ATELwdGngAAAABJRU5ErkJggg=='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0klEQVR4nO2YvUoDQRSF10LRVkuVtGHDnrMhzSqWvoGPYSdoKVrEN7Cw0sImb2D6FFpa2EhaIyoWkiJGxZXBjQzB3ezPzLDROTAEkp2z98u9c/LjOFZWVn9XQRAskDwk2QXwQTLMs6K9XZIHwtNY8QA6eYtOgOlUKpV57QD8fueVFi9B7JsA6Eo33W00GrN5vcReknsSwK2jW5Bm3nXduaJ+woPkIPLsO7pFqeUKPZuiePGoytMogFExB4CYdQA7JK8BvGU42PcANoRHvV5fA9CLnh8CaNdqtVVlACSPpFlWmUwnwh/A8S+vtVUBzEQzrLr43qgDnucFAO7GrnlV2YFmig4Uil0l5zDrZtWxaxxAU+yGFoD/vQNMH7uD8U/oMgBkjd1+2QDSxm5Y1g4UEi0AbQcKiXaE+HMwn+Nij+R26TvA5K/CN9MM0C9zBz5Hm8XPPK030+EJ4GW02ff99WkEaE2Y/atqtbpUWgCSywCeJkBslRZAgmjJ4ySty7gOJMRu7uXoluqCaQE0x25Kz9DYCGWN3TICtPLMNoBH3/c3JZ8zAO+F/5nTEbsJEOfCw3XdxZhrLrQDpIjduPUw1oFTqQNDUbzneStGAKysrBzj+gL+5IY5xhvPDgAAAABJRU5ErkJggg=='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="dashboard icon"
    />
  );
};

export default ResourcesIcon;
