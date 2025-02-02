using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command: IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Activity? dbActivity = await _context.Activities.FindAsync(request.Activity.Id); 
                if (dbActivity != null){
                    _mapper.Map(request.Activity, dbActivity);
                }
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}