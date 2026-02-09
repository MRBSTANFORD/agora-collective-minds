import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { alternativeMinds, MIND_CATEGORIES, AlternativeExpert } from '@/config/alternativeMinds';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ExpertSwapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (expert: AlternativeExpert) => void;
  currentExpertName: string;
  /** IDs of experts already in the active panel (to disable them) */
  excludeIds?: string[];
}

const ExpertSwapDialog: React.FC<ExpertSwapDialogProps> = ({
  open,
  onOpenChange,
  onSelect,
  currentExpertName,
  excludeIds = [],
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(MIND_CATEGORIES[0].id);
  const [eraFilter, setEraFilter] = useState<'all' | 'pre' | 'post'>('all');

  const filteredMinds = useMemo(() => {
    return alternativeMinds.filter(m => {
      if (m.category !== activeCategory) return false;
      if (eraFilter !== 'all' && m.eraType !== eraFilter) return false;
      return true;
    });
  }, [activeCategory, eraFilter]);

  const handleSelect = (expert: AlternativeExpert) => {
    onSelect(expert);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Replace {currentExpertName}</DialogTitle>
          <DialogDescription>
            Choose an alternative mind from 7 disciplines. Browse by category and era.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-1 min-h-0 flex flex-col">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-slate-100 p-1">
            {MIND_CATEGORIES.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs px-2 py-1">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Era filter */}
          <div className="flex items-center gap-2 mt-3 mb-2">
            <span className="text-xs text-slate-500 font-medium">Era:</span>
            <ToggleGroup type="single" value={eraFilter} onValueChange={(v) => v && setEraFilter(v as any)} size="sm">
              <ToggleGroupItem value="all" className="text-xs px-2 h-7">All</ToggleGroupItem>
              <ToggleGroupItem value="pre" className="text-xs px-2 h-7">Pre-Industrial</ToggleGroupItem>
              <ToggleGroupItem value="post" className="text-xs px-2 h-7">Post-Industrial</ToggleGroupItem>
            </ToggleGroup>
          </div>

          {MIND_CATEGORIES.map(cat => (
            <TabsContent key={cat.id} value={cat.id} className="flex-1 min-h-0 mt-0">
              <ScrollArea className="h-[50vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4">
                  {filteredMinds.map(expert => {
                    const isExcluded = excludeIds.includes(expert.id);
                    return (
                      <div
                        key={expert.id}
                        className={`border rounded-lg p-4 transition-all ${
                          isExcluded
                            ? 'opacity-40 cursor-not-allowed bg-slate-50'
                            : 'hover:border-amber-300 hover:shadow-md cursor-pointer bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="w-12 h-12 shrink-0 border border-slate-200">
                            <AvatarImage src={expert.imageUrl} alt={expert.name} />
                            <AvatarFallback className="text-xs">
                              {expert.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-slate-900 truncate">{expert.name}</h4>
                            <p className="text-xs text-slate-500">{expert.era}</p>
                            <Badge variant="secondary" className="text-[10px] mt-1 bg-amber-50 text-amber-700 border-amber-200">
                              {expert.domain}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">{expert.description}</p>
                        <blockquote className="text-[11px] italic text-slate-500 mt-2 border-l-2 border-amber-200 pl-2 line-clamp-1">
                          "{expert.quote}"
                        </blockquote>

                        {/* Trait bars */}
                        <div className="flex gap-3 mt-2 text-[10px] text-slate-500">
                          <span>C:{expert.traits.creativity}</span>
                          <span>S:{expert.traits.skepticism}</span>
                          <span>O:{expert.traits.optimism}</span>
                        </div>

                        <Button
                          size="sm"
                          className="w-full mt-3 text-xs h-7"
                          variant={isExcluded ? 'outline' : 'default'}
                          disabled={isExcluded}
                          onClick={() => !isExcluded && handleSelect(expert)}
                        >
                          {isExcluded ? 'Already Selected' : 'Select This Mind'}
                        </Button>
                      </div>
                    );
                  })}
                  {filteredMinds.length === 0 && (
                    <p className="col-span-2 text-center text-sm text-slate-400 py-8">
                      No minds match the current filter.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertSwapDialog;
