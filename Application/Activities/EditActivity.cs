using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command: IRequest<Activity>
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Activity?>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            
            public async Task<Activity?> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity? dbActivity = await _context.Activities.FindAsync(request.Activity.Id, cancellationToken); 
                if (dbActivity != null){
                    _mapper.Map(request.Activity, dbActivity);
                }
                await _context.SaveChangesAsync(cancellationToken);
                return await _context.Activities.FindAsync(request.Activity.Id, cancellationToken);
            }
        }
    }
}