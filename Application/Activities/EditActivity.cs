using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command: IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;
            
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity= request.Activity;
                _context.Update(activity);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}